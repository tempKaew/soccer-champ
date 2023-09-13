import { type } from 'os'

export type userPoint = {
  id: bigint | null
  point: string
  match: string
  name: string | undefined
  image: string | null | undefined
}

export type typeUserProfile = {
  id: BigInt | undefined
  name: string | undefined
  image: string | null | undefined
}

export type typeMatchFlex = {
  id: BigInt | null
  teamHomeName: string | null
  teamHomeImage: string | null
  teamVisitorName: string | null
  teamVisitorImage: string | null
  dateKickoff: Date | null
  channel: string | null
}

export type typeMapMatchApi = {
  status: string | null
  home: {
    id: number | null
    name: string | null
    goal: number | null
    winner: boolean | null
  }
  visitor: {
    id: number | null
    name: string | null
    goal: number | null
    winner: boolean | null
  }
}

export type typeMathWhoIs = {
  id: bigint
  home: {
    id: bigint | undefined
    name: string | undefined
    image: string | undefined
    joiner: typeUserProfile[] | undefined
  }
  visitor: {
    id: bigint | undefined
    name: string | undefined
    image: string | undefined
    joiner: typeUserProfile[] | undefined
  }
  draw: {
    joiner: typeUserProfile[] | undefined
  }
}

export type typeTeamInfo = {
  id: bigint
  image: string
  name: string
  champ_score: number | null
}

export type typeChampWhoIs = {
  id: bigint
  line_user_name: string
  line_user_image: string
  team_champ_name: string
  team_champ_image: string
  point: number
}

export type match = {
  id: BigInt | null
  teams_match_team_home_idToteams: teamMatch | null
  teams_match_team_visitor_idToteams: teamMatch | null
  date_time_kickoff: Date | null
  channel_live: string | null
}

export type teamMatch = {
  name: string | null
  image: string | null
}
