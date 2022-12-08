import { prisma } from "@lib/prisma"
import { typeTeamInfo } from "@lib/types";
import { FlexMessage, MessageAPIResponseBase, WebhookEvent } from "@line/bot-sdk";
import client from '@lib/line/client';
import teamChampMessage from "@line-message/team-champ-message";

const replyPredictionEvent = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text' || event.source.type !== 'group') {
    return;
  }

  const { replyToken } = event;

  const teams = await prisma.teams.findMany({
    where: {
      is_finalist: true
    }
  })

  if (teams && teams.length!==0) {
    const teamMap:(typeTeamInfo)[] = teams.map(team => {
      return {
        id: team.id,
        image: team.image,
        name: team.name
      }
    })
    console.log(teamMap);
    const predictionMessage: FlexMessage = {
      type: 'flex',
      altText: 'match นี้ใครทายบ้าง',
      contents: teamChampMessage(teamMap)
    }
    await client.replyMessage(replyToken, predictionMessage)
  }

  return
}

export default replyPredictionEvent