import { WebhookEvent, FlexMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import { getMatchToday } from '../../query';
import { typeMatchFlex } from '../../types';
import client from '../client';
import matchFlexMessage from '../style-message/match-flex-message';

const matchStart = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;
  // const { text } = event.message;

  const matchToday = await getMatchToday()

  const mapMatches:(typeMatchFlex)[] = matchToday.map( match => {
    return {
      "teamHomeName": match.teams_match_team_home_idToteams?.name ?? '',
      "teamHomeImage": match.teams_match_team_home_idToteams?.image ?? '',
      "teamVisitorName": match.teams_match_team_visitor_idToteams?.name ?? '',
      "teamVisitorImage": match.teams_match_team_visitor_idToteams?.image ?? '',
      "dateKickoff": match.date_time_kickoff,
      "channel": match.channel_live ?? ''
    }
  })

  if (event.source.type === 'group') {
    const response: FlexMessage = {
      type: 'flex',
      altText: 'test',
      contents: matchFlexMessage(mapMatches)
    }
    await client.replyMessage(replyToken, response);
  }
}

export default matchStart