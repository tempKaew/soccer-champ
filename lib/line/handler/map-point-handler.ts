import { prisma } from "@lib/prisma"

const mapPointHandler = async () => {

  const endMatches = await prisma.match.findMany({
    where: {
      match_end: true,
      point_mapped: false
    }
  })

  if (endMatches.length <= 0) {
    return 'empty team';
  }

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
        .then(() => {
          console.log('mapWinnerHome complete');
        })
        .catch((err) => {
          console.log(err);
        });
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
        .then(() => {
          console.log('mapWinnerVisitor complete');
        })
        .catch((err) => {
          console.log(err);
        });
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
        .then(() => {
          console.log('mapWinnerHome complete');
        })
        .catch((err) => {
          console.log(err);
        });

        const mapWinnerVisitor = await prisma.joiner.updateMany({
          where: {
            team_winner_id: match.team_visitor_id,
            match_id: match.id
          },
          data: {
            point: 1
          }
        })
        .then(() => {
          console.log('mapWinnerVisitor complete');
        })
        .catch((err) => {
          console.log(err);
        });

        const mapWinnerDraw = await prisma.joiner.updateMany({
          where: {
            team_winner_id: null,
            match_id: match.id
          },
          data: {
            point: 3
          }
        })
        .then(() => {
          console.log('mapWinnerDraw complete');
        })
        .catch((err) => {
          console.log(err);
        });

      }

      const updateMapped = await prisma.match.update({
        where: {
          id: match.id
        },
        data: {
          point_mapped: true,
          updated_at: new Date()
        }
      })
      .then(() => {
        console.log('updateMapped complete');
      })
      .catch((err) => {
        console.log(err);
      });

    }

  });

  return 'map complete'

}

export default mapPointHandler