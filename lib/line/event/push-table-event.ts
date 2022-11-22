import { FlexMessage } from '@line/bot-sdk';
import { prisma } from "../../../lib/prisma"
import client from "../../../lib/line/client";
import tableMessage from "../../../lib/line/style-message/tables-message";
import { userPoint } from "../../../lib/types";
import { getGroupById } from '../../query';

const pushTableEvent = async (
  groupId: bigint | null,
  lineGroupId: string,
) => {

  var group_id = groupId
  if (groupId === null) {
    const getGroup = await getGroupById(lineGroupId)
    group_id = getGroup ? getGroup.id : null
  }

  if (group_id===null) {
    return;
  }

  const tables = await prisma.joiner.groupBy({
    where: {
      group_id: group_id
    },
    by: [
      'line_user_id'
    ],
    _sum: {
      point: true,
    },
    _count: {
      point: true,
    },
    orderBy: {
      _sum: {
        point: 'desc',
      },
    },
    take: 10
  });

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

  const tableMapped:(userPoint)[] = tables.map((table) => {
    let user = users.find(u => u.id === table.line_user_id);
    return {
      'id': table.line_user_id,
      'point': table._sum.point?.toString() ?? '',
      'match': table._count.point?.toString() ?? '',
      'name': user?.name,
      'image': user?.image
    }
  })

  const pushTable: FlexMessage = {
    type: 'flex',
    altText: 'tables',
    contents: tableMessage(tableMapped)
  }
  await client.pushMessage(lineGroupId, pushTable);

}

export default pushTableEvent;