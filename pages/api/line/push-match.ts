import { NextApiRequest, NextApiResponse } from "next";
import { ClientConfig, Client, FlexMessage } from '@line/bot-sdk';
import matchFlexMessage from "../../../lib/line/style-message/match-flex-message";
import { getActiveGroup, getMatchToday } from "../../../lib/query";
import { typeMatchFlex } from "../../../lib/types";

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

  console.log(groups);

  await Promise.all(groups.map(async(group) => {
    const response: FlexMessage = {
      type: 'flex',
      altText: 'test',
      contents: matchFlexMessage(mapMatches)
    }
    await client.pushMessage(group.line_group_id, response);
  }));

  return res.status(200).json({
    status: 'success',
  });
}