import { WebhookEvent, MessageAPIResponseBase } from '@line/bot-sdk';
import { leaveGroup } from "@lib/query";

const leaveGroupHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'leave' || event.source.type !== 'group') {
    return;
  }
  const groupId = event.source.groupId;
  const group = await leaveGroup(groupId)
  console.log(group, groupId);
}

export default leaveGroupHandler