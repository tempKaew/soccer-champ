import { NextApiRequest, NextApiResponse } from "next";
import mapPointHandler from "@line-handler/map-point-handler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mapStatus = await mapPointHandler()
  return res.status(200).json({
    status: mapStatus,
  });
}