import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Get by id
export async function GET(req, { params: { id } }) {
  const getByIdRes = await prisma.orders.findUnique({
    where: {
      order_id: parseInt(id),
    },
  });
  if (getByIdRes) {
    return NextResponse.json({
      status: 200,
      message: `Get order by id ${id} successfully.😍`,
      payload: getByIdRes,
    });
  } else {
    return NextResponse.json({
      status: 404,
      message: `Get order by id ${id} is not founded.🥲`,
    });
  }
}

//Update
export async function PUT(req, { params: { id } }) {
  const getById = await prisma.orders.findUnique({
    where: {
      order_id: parseInt(id),
    },
  });
  if (!getById) {
    return NextResponse.json({
      status: 404,
      message: `Get order by id ${id} is not founded.🥲`,
    });
  }
  const { customer_id, product_id, order_total, order_qty, order_date } =
    await req.json();
  const updateRes = await prisma.orders.update({
    where: {
      order_id: parseInt(id),
    },
    data: {
      customer_id,
      product_id,
      order_total,
      order_qty,
      order_date,
    },
  });
  return NextResponse.json({
    status: 200,
    message: `Order with id ${id} is updated successfully.😍`,
    payload: updateRes,
  });
}

//Delete
export async function DELETE(req, { params: { id } }) {
  const getById = await prisma.orders.findUnique({
    where: {
      order_id: parseInt(id),
    },
  });
  if (!getById) {
    return NextResponse.json({
      status: 404,
      message: `Get order by id ${id} is not founded.🥲`,
    });
  }
  const deleteRes = await prisma.orders.delete({
    where: {
      order_id: parseInt(id),
    },
  });
  return NextResponse.json({
    status: 200,
    message: `The order with id ${id} is deleted successfully.😍`,
  });
}
