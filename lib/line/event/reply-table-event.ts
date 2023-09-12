import {
  WebhookEvent,
  FlexMessage,
  MessageAPIResponseBase
} from '@line/bot-sdk'
import prisma from '@lib/prisma'
import client from '@lib/line/client'
import tableMessage from '@line-message/tables-message'
import { userPoint } from '@lib/types'
import { getGroupById } from '@lib/query'
import { convertDateTimeTh } from '@lib/date-time-th'

export default async function replyTableEvent(
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> {
  if (
    event.type !== 'message' ||
    event.message.type !== 'text' ||
    event.source.type !== 'group'
  ) {
    return
  }

  const { replyToken } = event

  const lineGroupId = event.source.groupId

  const getGroup = await getGroupById(lineGroupId)
  const group_id = getGroup ? getGroup.id : null

  if (group_id === null) {
    return
  }

  const tables = await prisma.joiner.groupBy({
    where: {
      group_id: group_id,
      match: {
        match_end: true
      }
    },
    by: ['line_user_id'],
    _sum: {
      point: true
    },
    _count: {
      point: true
    },
    orderBy: {
      _sum: {
        point: 'desc'
      }
    },
    take: 20
  })

  const users = await prisma.line_users.findMany({
    select: {
      id: true,
      name: true,
      image: true
    },
    where: {
      group_id: group_id
    }
  })

  const tableMapped: userPoint[] = tables.map((table) => {
    let user = users.find((u) => u.id === table.line_user_id)
    return {
      id: table.line_user_id,
      point: table._sum.point?.toString() ?? '',
      match: table._count.point?.toString() ?? '',
      name: user?.name,
      image: user?.image
    }
  })

  const lastMatchEnd = await prisma.match.findFirst({
    select: {
      updated_at: true
    },
    where: {
      match_end: true
    },
    orderBy: {
      updated_at: 'desc'
    }
  })

  const lastDateMatch = lastMatchEnd?.updated_at
    ? convertDateTimeTh(lastMatchEnd.updated_at)
    : ''

  const pushTable: FlexMessage = {
    type: 'flex',
    altText: 'ตารางอันดับคะแนน',
    contents: tableMessage(tableMapped, lastDateMatch)
  }
  await client
    .replyMessage(replyToken, pushTable)
    .then(() => {
      console.log('ok')
    })
    .catch((err) => {
      console.log(err)
    })
}
