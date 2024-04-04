import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";


export async function GET(req, { params: { id } }) {
  const getByCustomerIdRes = await prisma.orders.findMany({
    where: {
      customer_id: parseInt(id),
    },
  });
  if (getByCustomerIdRes.length === 0) {
    return NextResponse.json({
      status: 404,
      message: `No orders found for customer id: ${id}.🥲`,
    });
  }
  return NextResponse.json({
    status: 200,
    message: `Get orders by customer id ${id} successfully.😍`,
    payload: getByCateIdRes,
  });
}
