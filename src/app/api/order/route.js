import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Get all
export async function GET() {
  const getAllRes = await prisma.orders.findMany();
  return NextResponse.json({
    status: 200,
    message: "Get all orders successfully.😍",
    payload: getAllRes,
  });
}

//Create new order
export async function POST(req) {
  const { customer_id, product_id, order_qty } = await req.json();
  //Get checkCustomerId from customer table
  const checkCustomerId = await prisma.customers.findUnique({
    where: {
      customer_id: parseInt(customer_id),
    },
  });
  if (!checkCustomerId) {
    return NextResponse.json(
      {
        status: 404,
        message: `Customer with id (${customer_id}) is not have.🥲`,
      },
      { status: 404 }
    );
  }
  //Get checkProductId from product table
  const checkProductId = await prisma.products.findUnique({
    where: {
      product_id: parseInt(product_id),
    },
  });
  if (!checkProductId) {
    return NextResponse.json(
      {
        status: 404,
        message: `Product with id (${product_id}) is not have.🥲`,
      },
      { status: 404 }
    );
  }
  const createRes = await prisma.orders.create({
    data: {
      customer_id,
      product_id,
      order_total: checkProductId.price * order_qty,
      order_qty,
      order_date: new Date(),
    },
  });
  return NextResponse.json(
    {
      status: 201,
      message: "A new order is created successfully.😍",
      payload: createRes
    },
    { status: 201 }
  );
}
