import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import { createLineUser, existMatchToday, getGroupById, getLineUserById, getTeamByName } from '@lib/query';
import client from '@lib/line/client';
import { prisma } from "@lib/prisma"

const joinerGameHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text' || event.source.type !== 'group') {
    return;
  }
  const groupId = event.source.groupId;
  const userId = event.source.userId ? event.source.userId : '';
  let userProfile = await client.getGroupMemberProfile(groupId, userId)

  const rexName = event.message.text.match(/ทายผล (\S+) (\S+)/)
  let teamName = rexName?.length ? rexName[1] : null
  let status = rexName?.length ? rexName[2] : null

  if (
    teamName===null
    || status === null
  ) {
    return;
  }

  const team = await getTeamByName(teamName)
  const match = team ?  await existMatchToday(team?.id) : null
  const matchId = match ? match.id : null
  const teamID = (team&&status=='ชนะ') ? team.id : null

  const date = new Date();
  let current = new Date(date.getTime() + (7*60*60*1000));

  if (
    match
    && match.date_time_kickoff
    && current >= match.date_time_kickoff
  ) {
    const { replyToken } = event;
    const response: TextMessage = {
      type: 'text',
      text: teamName + ' เริ่มเตะแล้ว ไม่รับคำตอบครับ'
    };
    await client.replyMessage(replyToken, response);
    return;
  }

  // check team time to kick off today
  if (team && !match) {
    const { replyToken } = event;
    const response: TextMessage = {
      type: 'text',
      text: 'วันนี้ทีมนี้ไม่ได้เตะ'
    };
    await client.replyMessage(replyToken, response);
    return;
  }else if(!team){
    const { replyToken } = event;
    const response: TextMessage = {
      type: 'text',
      text: 'ไม่มีทีมนี้'
    };
    await client.replyMessage(replyToken, response);
    return;
  }

  const group = await getGroupById(groupId)
  var user = await getLineUserById(userId ?? '')

  if (!user && userId && group) {
    user = await createLineUser(
      userId,
      userProfile.displayName,
      group?.id,
      userProfile.pictureUrl
    )
  }

  if (
    user
    && (userProfile.pictureUrl != user.image || userProfile.displayName != user.name)
  ) {
    const updateProfile = await prisma.line_users.update({
      where: {
        line_user_id: userProfile.userId
      },
      data: {
        name: userProfile.displayName,
        image: userProfile.pictureUrl
      },
    })
  }
  
  const existJoin = await prisma?.joiner.findFirst({
    where: {
      line_user_id: user?.id,
      group_id: group?.id,
      match_id: matchId
    }
  })

  if (existJoin) {
    const { replyToken } = event;
    const response: TextMessage = {
      type: 'text',
      text: 'คุณ ' + user?.name + ' ส่งคำตอบแล้ว'
    };
    await client.replyMessage(replyToken, response);
    return;
  }else{
    const addJoiner = await prisma?.joiner.create({
      data: {
        line_user_id: user?.id,
        group_id: group?.id,
        team_winner_id: teamID,
        match_id: matchId
      }
    })
    if (addJoiner) {
      const { replyToken } = event;
      const response: TextMessage = {
        type: 'text',
        text: 'รับข้อมูล ' + user?.name + ' เรียบร้อย'
      };
      await client.replyMessage(replyToken, response);
      return;
    }
  }
}
export default joinerGameHandler