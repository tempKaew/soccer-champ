import { prisma } from "@lib/prisma"

export const createGroup = async (line_group_id: string, name: string, image:string) => {
  const group = await prisma.groups.upsert({
    where: {
      line_group_id: line_group_id,
    },
    update: {
      joined: true
    },
    create: {
      line_group_id: line_group_id,
      name: name,
      image: image,
      joined: true
    },
  })
  console.log(group)
}

export const createLineUser = async(lineUserId:string, lineName:string, groupId: bigint, lineImage: string) => {
  return prisma.line_users.create({
    data: {
      name: lineName,
      group_id: groupId,
      line_user_id: lineUserId,
      image: lineImage
    }
  })
}

export const getGroupById = async(lineGroupId:string) => {
  return prisma.groups.findFirst({
    where: {
      line_group_id: lineGroupId
    }
  })
}

export const getLineUserById = async(lineUserId:string) => {
  return prisma.line_users.findFirst({
    where: {
      line_user_id: lineUserId
    }
  })
}

export const getTeamByName = async(teamName: string) => {
  return prisma.teams.findFirst({
    where: {
      name: teamName
    }
  })
}

export const leaveGroup = async (line_group_id: string) => {
  const group = await prisma.groups.update({
    where: {
      line_group_id: line_group_id,
    },
    data: {
      joined: false
    },
  })
  console.log(group)
}

export const getMatchToday = async () => {

  let startDate = new Date()
  startDate.setUTCHours(17)
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  startDate.setMilliseconds(0)

  let endDate = new Date()
  endDate.setUTCDate(endDate.getDate() + 1)
  endDate.setUTCHours(4)
  endDate.setMinutes(0)
  endDate.setSeconds(0)
  endDate.setMilliseconds(0)

  const matchToday = await prisma.match.findMany({
    where: {
      date_time_kickoff: {
        gte: startDate,
        lt:  endDate
      },
      match_end: false
    },
    select: {
      id:true,
      channel_live: true,
      team_home_id: true,
      team_visitor_id: true,
      date_time_kickoff: true,
      teams_match_team_home_idToteams: {},
      teams_match_team_visitor_idToteams: {}
    },
    orderBy: {
      date_time_kickoff: 'asc'
    }
  })
  return matchToday
}

export const existMatchToday = async(teamId:bigint) => {
  let startDate = new Date()
  startDate.setUTCHours(17)
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  startDate.setMilliseconds(0)

  let endDate = new Date()
  endDate.setUTCDate(endDate.getDate() + 1)
  endDate.setUTCHours(4)
  endDate.setMinutes(0)
  endDate.setSeconds(0)
  endDate.setMilliseconds(0)

  const matchToday = await prisma.match.findFirst({
    where: {
      date_time_kickoff: {
        gte: startDate,
        lt:  endDate
      },
      OR: [
        {
          team_home_id: teamId,
        },
        {
          team_visitor_id: teamId,
        }
      ]
    },
  })
  return matchToday
}

export const getMatchBeforeMinute = async(minute:number) => {
  const date = new Date();
  let startDate = new Date(date.getTime() + (minute*60*1000));
  let endDate = new Date(date.getTime() + (minute*60*1000));

  const matches = await prisma.match.findMany({
    where: {
      date_time_kickoff: {
        gte: startDate,
        lt:  endDate
      }
    },
    select: {
      channel_live: true,
      team_home_id: true,
      team_visitor_id: true,
      date_time_kickoff: true,
      teams_match_team_home_idToteams: {},
      teams_match_team_visitor_idToteams: {}
    }
  })
  return matches
}

export const getActiveGroup = async () => {
  return await prisma.groups.findMany({
    where: {
      joined: true
    }
  })
}