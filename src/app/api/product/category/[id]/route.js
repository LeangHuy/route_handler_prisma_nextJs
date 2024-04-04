import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Get by category id
export async function GET(req, { params: { id } }) {
  const getByCateIdRes = await prisma.products.findMany({
    where: {
      category_id: parseInt(id),
    },
  });
  if (getByCateIdRes.length === 0) {
    return NextResponse.json({
      status: 404,
      message: `No products found for category id: ${id}.🥲`,
    }, {status:404});
  }
  return NextResponse.json({
    status: 200,
    message: `Get products by category id ${id} successfully.😍`,
    payload: getByCateIdRes,
  });
}
