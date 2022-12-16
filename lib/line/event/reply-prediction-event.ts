import { prisma } from "@lib/prisma"
import { typeTeamInfo } from "@lib/types";
import { FlexMessage, MessageAPIResponseBase, TextMessage, WebhookEvent } from "@line/bot-sdk";
import client from '@lib/line/client';
import teamChampMessage from "@line-message/team-champ-message";

export default async function replyPredictionEvent (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
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
        name: team.name,
        champ_score: team.champ_score
      }
    })
    console.log(teamMap);
    const predictionMessage: FlexMessage = {
      type: 'flex',
      altText: 'match นี้ใครทายบ้าง',
      contents: teamChampMessage(teamMap)
    }
    return await client.replyMessage(replyToken, predictionMessage)
  }else{
    const { replyToken } = event;
    const response: TextMessage = {
      type: 'text',
      text: 'ไม่มีทีมให้ทายผล'
    };
    return await client.replyMessage(replyToken, response);
  }

  return
}