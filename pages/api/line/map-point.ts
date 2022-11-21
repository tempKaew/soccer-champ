import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const endMatches = await prisma.match.findMany({
    where: {
      match_end: true,
      point_mapped: false
    }
  })

  endMatches.forEach(async(match) => {

    if (match.team_home_score !== null && match.team_visitor_score  !== null) {
      var teamWinnerId = null;
      var pointCollect = 1;
      if (match.team_home_score > match.team_visitor_score) {
        teamWinnerId = match.team_home_id
        pointCollect = 3
      }else if(match.team_home_score < match.team_visitor_score) {
        teamWinnerId = match.team_visitor_id
        pointCollect = 3
      }

      const mapPoint = await prisma.joiner.updateMany({
        where: {
          team_winner_id: teamWinnerId
        },
        data: {
          point: pointCollect
        }
      })

      if (mapPoint) {
        const updateMapped = await prisma.match.update({
          where: {
            id: match.id
          },
          data: {
            point_mapped: true
          }
        })
        console.log('match id: ' + match.id + ' update point team home winner(' + teamWinnerId + ') complete')
      }else{
        console.log('match id: ' + match.id +' update error')
      }

    }

  });

  return res.status(200).json({
    status: 'success',
  });
}