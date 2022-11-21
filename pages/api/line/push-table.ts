import { NextApiRequest, NextApiResponse } from "next";
import pushTableEvent from "../../../lib/line/event/push-table-event";
import { getActiveGroup } from "../../../lib/query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const groups = await getActiveGroup();

  await Promise.all(groups.map(async(group) => {
    await pushTableEvent(group.id, group.line_group_id)
  }));

  return res.status(200).json({
    status: 'success',
  });
}