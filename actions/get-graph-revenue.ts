import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: string]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    if (monthlyRevenue[month]) {
      monthlyRevenue[month] += revenueForOrder;
    } else {
      monthlyRevenue[month] = revenueForOrder;
    }
  }

  const graphData: GraphData[] = [
    {
      name: "Jan",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Feb",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Apr",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "May",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Jun",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Jul",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Aug",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Sep",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Oct",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Nov",
      total: monthlyRevenue[0] || 0,
    },
    {
      name: "Dec",
      total: monthlyRevenue[0] || 0,
    },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
