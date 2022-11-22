export type userPoint = {
  id: bigint | null,
  point: string,
  match: string,
  name: string | undefined,
  image: string | null | undefined
}

export type typeMatchFlex = {
  teamHomeName: string | null,
  teamHomeImage: string | null,
  teamVisitorName: string | null,
  teamVisitorImage: string | null,
  dateKickoff: Date | null,
  channel: string | null,
}