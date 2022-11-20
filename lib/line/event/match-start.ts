import { WebhookEvent, FlexMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import { getMatchToday } from '../../query';
import client from '../client';
import matchFlexMessage from '../style-message/match-flex-message';

const matchStart = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;
  const { text } = event.message;

  const matchToday = await getMatchToday()

  await Promise.all(matchToday.map(async(match) => {

    let teamHomeName = match.teams_match_team_home_idToteams?.name
    let teamHomeImage = match.teams_match_team_home_idToteams?.image

    let teamVisitorName = match.teams_match_team_visitor_idToteams?.name
    let teamVisitorImage = match.teams_match_team_visitor_idToteams?.image

    let dateKickoff = match.date_time_kickoff ? new Date(match.date_time_kickoff).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:00/, '') : ''

    let channel = match.channel_live

    if (event.source.type === 'group') {
      const response: FlexMessage = {
        type: 'flex',
        altText: 'test',
        contents: matchFlexMessage({
          teamHomeName,
          teamHomeImage,
          teamVisitorName,
          teamVisitorImage,
          dateKickoff,
          channel
        })
      }
      await client.pushMessage(event.source.groupId, response);
    }
    
  }));
}

export default matchStart