import { prisma } from "@lib/prisma"
import client from '@lib/line/client';
import { getGroupById } from '@lib/query';
import { MessageAPIResponseBase, TextMessage, FlexMessage, WebhookEvent } from "@line/bot-sdk"
import { typeChampWhoIs } from "@lib/types";
import champWhoIsMessage from "@line-message/champ-who-is-message";

export default async function replyPredictionWhoEvent (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
  if (event.type !== 'message' || event.message.type !== 'text' || event.source.type !== 'group') {
    return;
  }

  const groupId = event.source.groupId;
  const { replyToken } = event;
  const group = await getGroupById(groupId)

  if (!groupId) {
    const response: TextMessage = {
      type: 'text',
      text: 'ไม่มีข้อมูลกลุ่ม'
    };
    await client.replyMessage(replyToken, response);
  }

  if (group) {
    const predictions = await prisma.joiner_champ.findMany({
      where: {
        group_id: group.id
      },
      include: {
        line_users: true,
        teams: true
      },
      orderBy: {
        point: 'desc'
      }
    })

    const mapPredictions:(typeChampWhoIs)[] = predictions.map( p => {
      return {
        id: p.id,
        line_user_name: p.line_users?.name ?? '',
        line_user_image: p.line_users?.image ?? '',
        team_champ_name: p.teams?.name ?? '',
        team_champ_image: p.teams?.image ?? '',
        point: p.point ?? 0
      }
    })
    if (mapPredictions.length) {
      const response: FlexMessage = {
        type: 'flex',
        altText: 'สรุปการทายแชมป์',
        contents: champWhoIsMessage(mapPredictions)
      }
      await client.replyMessage(replyToken, response);
    }else{
      const response: TextMessage = {
        type: 'text',
        text: 'ไม่มีผู้ทายแชมป์ในกลุ่มนี้'
      };
      await client.replyMessage(replyToken, response);
    }
  }else{
    const response: TextMessage = {
      type: 'text',
      text: 'กลุ่มได้ถูกลบแล้ว'
    };
    await client.replyMessage(replyToken, response);
  }

}