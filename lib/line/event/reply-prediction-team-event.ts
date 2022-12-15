import { prisma } from "@lib/prisma"
import client from '@lib/line/client';
import { createLineUser, getGroupById, getLineUserById } from '@lib/query';
import { MessageAPIResponseBase, TextMessage, WebhookEvent } from "@line/bot-sdk"

const replyPredictionTeamEvent = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text' || event.source.type !== 'group') {
    return;
  }
  const groupId = event.source.groupId;
  const userId = event.source.userId ? event.source.userId : '';
  let userProfile = await client.getGroupMemberProfile(groupId, userId)

  const { replyToken } = event;
  const rexName = event.message.text.match(/ทายแชมป์โลกคือ (\S+)/)
  let teamChamp = rexName?.length ? rexName[1] : null

  if (teamChamp===null) {
    return;
  }

  const team =  await prisma.teams.findFirst({
    where: {
      name: teamChamp,
      is_finalist: true
    }
  })
  const teamID = (team) ? team.id : null

  if (
    teamID && groupId && userId
  ) {
    const group = await getGroupById(groupId)
    var user = await getLineUserById(userId)

    if (!user && userId && group) {
      user = await createLineUser(
        userId,
        userProfile.displayName,
        group?.id,
        userProfile.pictureUrl
      )
    }

    if (group&&user) {
      const existJoinerChamp = await prisma.joiner_champ.findFirst({
        where: {
          line_user_id: user.id,
          group_id: group.id
        }
      })
      if (
        existJoinerChamp
        && existJoinerChamp.team_champ_id == teamID
      ){
        const response: TextMessage = {
          type: 'text',
          text: 'คุณได้ทายทีมนี้เป็นแชมป์ไปแล้ว'
        };
        await client.replyMessage(replyToken, response);
      }else if (existJoinerChamp) {
        const updateJoinerChamp = await prisma.joiner_champ.update({
          where: {
            id: existJoinerChamp.id
          },
          data: {
            team_champ_id: team?.id,
            point: team?.champ_score,
            updated_at: new Date()
          }
        })
        if (updateJoinerChamp) {
          const response: TextMessage = {
            type: 'text',
            text: 'แก้ไขคำตอบ คุณ' + user.name + ' ทาย ' + team?.name + ' เป็นแชมป์'
          };
          await client.replyMessage(replyToken, response);
        }else{
          const response: TextMessage = {
            type: 'text',
            text: 'รับคำตอบ คุณ' + user.name + ' ไม่ได้ ลองใหม่อีกครั้ง'
          };
          await client.replyMessage(replyToken, response);
        }
      }else{
        const addJoinerChamp = await prisma.joiner_champ.create({
          data: {
            line_user_id: user.id,
            group_id: group.id,
            team_champ_id: team?.id,
            point: team?.champ_score
          }
        })
        if (addJoinerChamp) {
          const response: TextMessage = {
            type: 'text',
            text: 'รับคำตอบ คุณ' + user.name + ' ทาย ' + team?.name + ' เป็นแชมป์'
          };
          await client.replyMessage(replyToken, response);
        }else{
          const response: TextMessage = {
            type: 'text',
            text: 'รับคำตอบ คุณ' + user.name + ' ไม่ได้ ลองใหม่อีกครั้ง'
          };
          await client.replyMessage(replyToken, response);
        }
      }
    }
  }else{
    const response: TextMessage = {
      type: 'text',
      text: 'ไม่มีทีมนี้'
    };
    await client.replyMessage(replyToken, response);
  }
  return
}

export default replyPredictionTeamEvent