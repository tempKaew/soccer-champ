import { NextApiRequest, NextApiResponse } from "next";
import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import client from '@lib/line/client';
import joinGroupHandler from '@line-event/join-group-handler';
import replyMatchEvent from '@line-event/reply-match-event';
import leaveGroupHandler from '@line-event/leave-group-handler';
import joinerGameHandler from '@line-event/joiner-game-handler';
import replyTableEvent from '@line-event/reply-table-event';
import replyMatchWhoIsEvent from '@line-event/reply-match-who-is-event';
import mapPointEvent from '@line-event/reply-map-point-event';
import replyPredictionEvent from "@line-event/reply-prediction-event";
import replyPredictionTeamEvent from "@line-event/reply-prediction-team-event";
import replyPredictionWhoEvent from "@line-event/reply-prediction-who-event";

const textEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;
  const { text } = event.message;
  const response: TextMessage = {
    type: 'text',
    text: 'return : ' + text
  };
  await client.replyMessage(replyToken, response);
}

const followEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'follow') {
    return;
  }
  const userId = event.source.userId
  const { replyToken } = event;
  const response: TextMessage = {
    type: 'text',
    text: 'welcome'
  };
  await client.replyMessage(replyToken, response);
}

const unFollowEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'unfollow') {
    return;
  }
  const userId = event.source.userId
  console.log('unfollow userID: ',userId)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method Not Allowed'
    });
  }

  const events: WebhookEvent[] = req.body.events;

  if (events===undefined) {
    return res.status(200).json({
      status: 'success'
    });
  }

  const results = await Promise.all(
    events.map(async (event: WebhookEvent) => {

      // console.log('event: ',event)
      // console.log('event.type: ',event.type)

      if (event.type === 'message' && event.message.type === 'text') {
        try {
          // await textEventHandler(event);
          if (
            event.message.text == 'ทายผลบอล'
            && event.source.type === 'group'
          ) {
            await replyMatchEvent(event);
          }
          else if (
            event.message.text == 'hello soccer-champ'
            && event.source.type === 'group'
          ) {
            const { replyToken } = event;
            const response: TextMessage = {
              type: 'text',
              text: 'สวัสดีครับ'
            };
            await client.replyMessage(replyToken, response);
          }
          else if (
            event.message.text == 'ทายแชมป์บอลโลก'
            && event.source.type === 'group'
          ) {
            await replyPredictionEvent(event)
          }
          else if (
            event.message.text == 'สรุปตารางอันดับ'
            && event.source.type === 'group'
          ) {
            await replyTableEvent(event)
          }
          else if (
            event.message.text == 'สรุปการทายแชมป์'
            && event.source.type === 'group'
          ) {
            await replyPredictionWhoEvent(event)
          }
          else if(
            ((/ทายผล (\S+) ชนะ/).test(event.message.text)
            || (/ทายผล (\S+) เสมอ/).test(event.message.text))
            && event.source.type === 'group'
          ) {
            await joinerGameHandler(event);
          }
          else if(
            (/การทายผลนัด (\S+)/).test(event.message.text)
            && event.source.type === 'group'
          ) {
            await replyMatchWhoIsEvent(event);
          }
          else if(
            (/ทายแชมป์โลกคือ (\S+)/).test(event.message.text)
            && event.source.type === 'group'
          ) {
            await replyPredictionTeamEvent(event)
          }
          else if (
            event.message.text === 'map point'
          ) {
            await mapPointEvent(event)
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
        }
      }else if (
        event.type === 'join'
        && event.source.type === 'group'
      ) {
        try {
          await joinGroupHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
        }
      }else if (
        event.type === 'leave'
        && event.source.type === 'group'
      ) {
        try {
          await leaveGroupHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
        }
      }else if (event.type === 'follow') {
        try {
          await followEventHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
        }
      }else if (event.type === 'unfollow') {
        try {
          await unFollowEventHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
        }
      }
    })
  );

  return res.status(200).json({
    status: 'success',
    results,
  });
}