import { NextApiRequest, NextApiResponse } from "next";
import { getOriginalNode } from "typescript";
import { prisma } from "../../../lib/prisma"
import { typeMapMatchApi } from "../../../lib/types";
import { getActiveGroup } from "../../../lib/query";
import pushTableEvent from "../../../lib/line/event/push-table-event";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // if (!process.env.API_SPORT_KEY) {
  //   return res.status(200).json({
  //     status: 'error key api sport',
  //   });
  // }

  // const response: Response = await fetch("https://v3.football.api-sports.io/fixtures?league=1&season=2022&date=2022-11-22", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "v3.football.api-sports.io",
  //     "x-rapidapi-key": process.env.API_SPORT_KEY
  //   }
  // })

  // if (!response.ok) {
  //   console.log('Authentication Failed')
  //   const statusText: string = await response.text()
  //   throw new Error(`HTTP error!: ${response.status} ${statusText}`);
  // }

  // const fixtures = await response.json()
  // if (fixtures.response.length) {
  //   const matches:(any)[] = fixtures.response
  //   const mapMatchApi:(typeMapMatchApi)[] = matches.map(match => {
  //     return {
  //       status: match?.fixture?.status.short,
  //       home: {
  //         id: match?.teams?.home?.id,
  //         name: match?.teams?.home?.name,
  //         goal: match?.goals?.home,
  //         winner: match?.teams?.home?.winner,
  //       },
  //       visitor: {
  //         id: match?.teams?.away?.id,
  //         name: match?.teams?.away?.name,
  //         goal: match?.goals?.away,
  //         winner: match?.teams?.away?.winner,
  //       },
  //     }
  //   })
  //   console.log(matches[1]);
  //   console.log(mapMatchApi)
    
  // }

  // return res.status(200).json({
  //   status: 'ok',
  // });

  const endMatches = await prisma.match.findMany({
    where: {
      match_end: true,
      point_mapped: false
    }
  })

  endMatches.map(async(match) => {

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

      // console.log('pointCollect: ',pointCollect)
      // console.log('teamWinnerId: ',teamWinnerId)

      // const mapPoint = await prisma.joiner.findMany({
      //   where: {
      //     team_winner_id: teamWinnerId,
      //     match_id: match.id
      //   }
      // })
      // console.log(mapPoint);
      

      // const mapPoint = await prisma.joiner.updateMany({
      //   where: {
      //     team_winner_id: teamWinnerId
      //   },
      //   data: {
      //     point: pointCollect
      //   }
      // })

      // if (mapPoint) {
      //   const updateMapped = await prisma.match.update({
      //     where: {
      //       id: match.id
      //     },
      //     data: {
      //       point_mapped: true
      //     }
      //   })
      //   console.log('match id: ' + match.id + ' update point team home winner(' + teamWinnerId + ') complete')
      // }else{
      //   console.log('match id: ' + match.id +' update error')
      // }

    }

  });

  const groups = await getActiveGroup();
  await Promise.all(groups.map(async(group) => {
    // await pushTableEvent(group.id, group.line_group_id)
  }));

  return res.status(200).json({
    status: 'success',
  });
}