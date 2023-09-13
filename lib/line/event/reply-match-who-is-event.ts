import {
  WebhookEvent,
  FlexMessage,
  TextMessage,
  MessageAPIResponseBase
} from '@line/bot-sdk'
import prisma from '@lib/prisma'
import { typeMathWhoIs, typeUserProfile } from '@lib/types'
import client from '@lib/line/client'
import matchWhoIsMessage from '@line-message/match-who-is-message'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export default async function replyMatchWhoIsEvent(
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> {
  if (
    event.type !== 'message' ||
    event.message.type !== 'text' ||
    event.source.type !== 'group'
  ) {
    return
  }

  const rexMatch = event.message.text.match(/การทายผลนัด (\S+)/)
  const matchId: bigint | null = rexMatch?.length ? BigInt(rexMatch[1]) : null

  if (matchId === null) {
    return
  }

  const { replyToken } = event
  const lineGroupId = event.source.groupId

  const match = await prisma.match
    .findFirst({
      where: {
        id: matchId
      },
      include: {
        teams_match_team_home_idToteams: true,
        teams_match_team_visitor_idToteams: true,
        joiner: {
          where: {
            groups: {
              line_group_id: lineGroupId
            }
          },
          include: {
            line_users: true
          }
        }
      }
    })
    .catch((err: PrismaClientKnownRequestError) => {
      console.log(err)
    })

  console.log(match)
  if (match && match.joiner.length !== 0) {
    const joinerTeamHome = match.joiner.filter(
      (j) => j.team_winner_id === match.team_home_id
    )
    const mapJoinerTeamHome: typeUserProfile[] = joinerTeamHome.map((j) => {
      return {
        id: j.line_users?.id,
        name: j.line_users?.name,
        image: j.line_users?.image
      }
    })

    const joinerTeamVisitor = match.joiner.filter(
      (j) => j.team_winner_id === match.team_visitor_id
    )
    const mapJoinerTeamVisitor: typeUserProfile[] = joinerTeamVisitor.map(
      (j) => {
        return {
          id: j.line_users?.id,
          name: j.line_users?.name,
          image: j.line_users?.image
        }
      }
    )

    const joinerTeamDraw = match.joiner.filter((j) => j.team_winner_id === null)
    const mapJoinerTeamDraw: typeUserProfile[] = joinerTeamDraw.map((j) => {
      return {
        id: j.line_users?.id,
        name: j.line_users?.name,
        image: j.line_users?.image
      }
    })

    const matchWhoIs: typeMathWhoIs = {
      id: match.id,
      home: {
        id: match.teams_match_team_home_idToteams?.id,
        name: match.teams_match_team_home_idToteams?.name,
        image: match.teams_match_team_home_idToteams?.image,
        joiner: mapJoinerTeamHome
      },
      visitor: {
        id: match.teams_match_team_visitor_idToteams?.id,
        name: match.teams_match_team_visitor_idToteams?.name,
        image: match.teams_match_team_visitor_idToteams?.image,
        joiner: mapJoinerTeamVisitor
      },
      draw: {
        joiner: mapJoinerTeamDraw
      }
    }

    const rulMessage: FlexMessage = {
      type: 'flex',
      altText: 'match นี้ใครทายบ้าง',
      contents: matchWhoIsMessage(matchWhoIs)
    }
    await client.replyMessage(replyToken, rulMessage)
  } else {
    const { replyToken } = event
    const response: TextMessage = {
      type: 'text',
      text: 'กลุ่มนี้ไม่มีคนทายเกมนี้'
    }
    await client.replyMessage(replyToken, response)
    return
  }
}
