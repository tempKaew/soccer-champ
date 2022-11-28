import { MessageAPIResponseBase, TextMessage, WebhookEvent } from "@line/bot-sdk"
import client from '../client';
import mapPointHandler from "../handler/map-point-handler";

const mapPointEvent = async(event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }
  const { replyToken } = event;

  const mapPoint = await mapPointHandler()
  const response: TextMessage = {
    type: 'text',
    text: mapPoint
  };
  await client.replyMessage(replyToken, response);

}
export default mapPointEvent