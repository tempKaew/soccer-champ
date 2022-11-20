import { NextApiRequest, NextApiResponse } from "next";
import { ClientConfig, Client, WebhookEvent, TextMessage, FlexMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import matchFlexMessage from "../../../lib/line/style-message/match-flex-message";
import { getActiveGroup, getMatchToday } from "../../../lib/query";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(clientConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method Not Allowed'
    });
  }

  const matchToday = await getMatchToday()
  const groups = await getActiveGroup();

  console.log(groups);
  

  await Promise.all(groups.map(async(group) => {
    
    await Promise.all(matchToday.map(async(match) => {

      let teamHomeName = match.teams_match_team_home_idToteams?.name
      let teamHomeImage = match.teams_match_team_home_idToteams?.image
  
      let teamVisitorName = match.teams_match_team_visitor_idToteams?.name
      let teamVisitorImage = match.teams_match_team_visitor_idToteams?.image
  
      let channel = match.channel_live
  
      const response: FlexMessage = {
        type: 'flex',
        altText: 'test',
        contents: matchFlexMessage({
          teamHomeName,
          teamHomeImage,
          teamVisitorName,
          teamVisitorImage,
          channel
        })
      }
      await client.pushMessage(group.line_group_id, response);
      
    }));
  }));

  return res.status(200).json({
    status: 'success',
  });
}