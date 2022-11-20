import { WebhookEvent, TextMessage, MessageAPIResponseBase, FlexMessage } from '@line/bot-sdk';
import { createGroup } from "../../../lib/query";
import client from '../client';
import ruleCollectPoint from '../style-message/rule-collect-point';

const joinGroupHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== 'join' || event.source.type !== 'group') {
    return;
  }
  const groupId = event.source.groupId;

  const groupProfile = await client.getGroupSummary(groupId)

  const group = await createGroup(groupProfile.groupId, groupProfile.groupName, groupProfile.pictureUrl)

  const txtMessage: TextMessage = {
    type: 'text',
    text: 'ขอขอบคุณที่เชิญเราเข้ากลุ่ม: ' + groupProfile.groupName + ' มาร่วมสนุกทายผลฟุตบอลกับเรากันครับ'
  };
  await client.pushMessage(groupId, txtMessage);

  const rulMessage: FlexMessage = {
    type: 'flex',
    altText: 'rule',
    contents: ruleCollectPoint()
  }
  await client.pushMessage(groupId, rulMessage);
}

export default joinGroupHandler