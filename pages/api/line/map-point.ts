import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma"
import { typeMapMatchApi } from "../../../lib/types";

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

  const current = new Date()
  const currentHours = current.getHours()

  if (
    currentHours >= 18
    || (currentHours >= 0 && currentHours <= 5)
  ) {

    const currentMonth = current.getMonth() + 1;
    var apiDate = current.getFullYear() + '-' + currentMonth + '-' + current.getDate()

    if (currentHours >= 0 && currentHours <= 5) {
      const yesterday = new Date().setDate(current.getDate() - 1);
      const y = new Date(yesterday);
      const yMonth = y.getMonth() + 1;
      apiDate = y.getFullYear() + '-' + yMonth + '-' + y.getDate()
    }

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
      throw new Error(`HTTP error!: ${response.status} ${statusText}`);
    }

    const fixtures = await response.json()
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
      // console.log(matches[1]);
      // console.log(mapMatchApi)

      const hasEndGame = mapMatchApi.filter(m => m.status === 'FT');
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

        //map point
        const endMatches = await prisma.match.findMany({
          where: {
            match_end: true,
            point_mapped: false
          }
        })

        endMatches.forEach(async(match) => {

          if (match.team_home_score !== null && match.team_visitor_score  !== null) {
      
            if (match.team_home_score > match.team_visitor_score) {
              const mapWinnerHome = await prisma.joiner.updateMany({
                where: {
                  team_winner_id: match.team_home_id,
                  match_id: match.id
                },
                data: {
                  point: 3
                }
              })
            }else if(match.team_home_score < match.team_visitor_score) {
              const mapWinnerVisitor = await prisma.joiner.updateMany({
                where: {
                  team_winner_id: match.team_visitor_id,
                  match_id: match.id
                },
                data: {
                  point: 3
                }
              })
            }else if(match.team_home_score == match.team_visitor_score) {
      
              const mapWinnerHome = await prisma.joiner.updateMany({
                where: {
                  team_winner_id: match.team_home_id,
                  match_id: match.id
                },
                data: {
                  point: 1
                }
              })
      
              const mapWinnerVisitor = await prisma.joiner.updateMany({
                where: {
                  team_winner_id: match.team_visitor_id,
                  match_id: match.id
                },
                data: {
                  point: 1
                }
              })
      
              const mapWinnerDraw = await prisma.joiner.updateMany({
                where: {
                  team_winner_id: null,
                  match_id: match.id
                },
                data: {
                  point: 3
                }
              })
      
            }
      
            const updateMapped = await prisma.match.update({
              where: {
                id: match.id
              },
              data: {
                point_mapped: true
              }
            })
      
          }
      
        });
        //---end map point

        return res.status(200).json({
          status: 'ok',
        });
      }else{
        return res.status(200).json({
          status: 'no team full time',
        });
      }
    }
  }else{
    return res.status(200).json({
      status: 'out of time fetch time:' + currentHours,
    });
  }
}