import { WebhookEvent, MessageAPIResponseBase } from '@line/bot-sdk';
import { leaveGroup } from "@lib/query";

export default async function leaveGroupHandler (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
  if (event.type !== 'leave' || event.source.type !== 'group') {
    return;
  }
  const groupId = event.source.groupId;
  const group = await leaveGroup(groupId)
  console.log(group, groupId);
}