import {
  MessageAPIResponseBase,
  TextMessage,
  WebhookEvent
} from '@line/bot-sdk'
import client from '@lib/line/client'
import mapPointHandler from '@line-handler/map-point-handler'

export default async function mapPointEvent(
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return
  }
  const { replyToken } = event

  const mapPoint = await mapPointHandler()
  const response: TextMessage = {
    type: 'text',
    text: mapPoint
  }
  await client.replyMessage(replyToken, response)
}
