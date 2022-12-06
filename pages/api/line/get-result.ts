import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@lib/prisma"
import { typeMapMatchApi } from "@lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!process.env.API_SPORT_KEY) {
    return res.status(200).json({
      status: 'error key api sport',
    });
  }

  const apiLeagueId = 1;
  const apiSeason = 2022;

  const current = new Date().toLocaleString('en-US', { timeZone: "Asia/Bangkok" });
  const currentThai = new Date(current)
  const currentHours = currentThai.getHours()
  console.log('currentHours: ', currentHours);

  if (
    currentHours >= 18
    || (currentHours >= 0 && currentHours <= 5)
  ) {

    const currentMonth = currentThai.getMonth() + 1;
    var apiDate = currentThai.getFullYear() + '-' + currentMonth + '-' + String(currentThai.getDate()).padStart(2, '0')

    if (currentHours >= 0 && currentHours <= 5) {
      const yesterday = new Date().setDate(currentThai.getDate() - 1);
      const y = new Date(yesterday);
      const yMonth = y.getMonth() + 1;
      apiDate = y.getFullYear() + '-' + yMonth + '-' + String(y.getDate()).padStart(2, '0')
    }
    console.log('apiDate: ',apiDate);

    const response: Response = await fetch('https://v3.football.api-sports.io/fixtures?league='+apiLeagueId+'&season='+apiSeason+'&date='+apiDate, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.API_SPORT_KEY
      }
    })

    if (!response.ok) {
      console.log('Authentication Failed')
      const statusText: string = await response.text()
      return res.status(200).json({
        status: `${response.status} ${statusText}`,
      });
    }

    const fixtures = await response.json()
    if (fixtures.errors?.length) {
      console.log(fixtures.errors);
      return res.status(200).json({
        status: `errors`,
      });
    }
    
    if (fixtures.response.length) {
      const matches:(any)[] = fixtures.response
      const mapMatchApi:(typeMapMatchApi)[] = matches.map(match => {
        return {
          status: match?.fixture?.status.short,
          home: {
            id: match?.teams?.home?.id,
            name: match?.teams?.home?.name,
            goal: match?.goals?.home,
            winner: match?.teams?.home?.winner,
          },
          visitor: {
            id: match?.teams?.away?.id,
            name: match?.teams?.away?.name,
            goal: match?.goals?.away,
            winner: match?.teams?.away?.winner,
          },
        }
      })

      const hasEndGame = mapMatchApi.filter(m => m.status === 'FT');
      console.log('hasEndGame: ',hasEndGame);
      if (hasEndGame.length) {

        //map score
        hasEndGame.forEach( async (game) => {
          if (game.home.id && game.visitor.id) {
            const match = await prisma.match.findFirst({
              where: {
                match_end: false,
                teams_match_team_home_idToteams:{
                  api_id: game.home.id
                },
                teams_match_team_visitor_idToteams: {
                  api_id: game.visitor.id
                }
              }
            })
            if (match) {
              const updateScore = await prisma.match.update({
                where: {
                  id: match.id
                },
                data: {
                  team_home_score: game.home.goal,
                  team_visitor_score: game.visitor.goal,
                  match_end: true,
                  updated_at: new Date()
                }
              })
              .then(() => {
                console.log('updateScore ok');
              })
              .catch((err) => {
                console.log(err);
              });
            }
          }
        });
        //---end map score

        return res.status(200).json({
          status: 'ok',
        });
      }else{
        return res.status(200).json({
          status: 'no team full time',
        });
      }
    }else{
      return res.status(200).json({
        status: `fixtures empty`,
      });
    }
  }else{
    return res.status(200).json({
      status: 'out of time fetch time:' + currentHours,
    });
  }
}