export type userPoint = {
  id: bigint | null,
  point: string,
  match: string,
  name: string | undefined,
  image: string | null | undefined
}

export type typeUserProfile = {
  id: BigInt | undefined,
  name: string | undefined,
  image: string | null | undefined
}

export type typeMatchFlex = {
  id: BigInt | null,
  teamHomeName: string | null,
  teamHomeImage: string | null,
  teamVisitorName: string | null,
  teamVisitorImage: string | null,
  dateKickoff: Date | null,
  channel: string | null,
}

export type typeMapMatchApi = {
  status: string | null,
  home: {
    id: number | null,
    name: string | null,
    goal: number | null,
    winner:  boolean | null
  },
  visitor: {
    id: number | null,
    name: string | null,
    goal: number | null,
    winner:  boolean | null
  }
}

export type typeMathWhoIs = {
  id: bigint,
  home: {
    id: bigint | undefined,
    name: string | undefined,
    image: string | undefined,
    joiner: (typeUserProfile)[] | undefined
  },
  visitor: {
    id: bigint | undefined,
    name: string | undefined,
    image: string | undefined,
    joiner: (typeUserProfile)[] | undefined
  },
  draw: {
    joiner: (typeUserProfile)[] | undefined
  }
}

export type typeTeamInfo = {
  id: bigint,
  image: string,
  name: string,
  champ_score: number | null
}