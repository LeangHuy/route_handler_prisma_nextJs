import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";


//Get by id
export async function GET(req, { params: { id } }) {
  const getByIdRes = await prisma.customers.findUnique({
    where: {
      customer_id: parseInt(id),
    },
  });
  if (getByIdRes) {
    return NextResponse.json({
      status: 200,
      message: `Get customer by id ${id} successfully.😍`,
      payload: getByIdRes,
    });
  } else {
    return NextResponse.json({
      status: 404,
      message: `Get customer by id ${id} is not founded.🥲`,
    },{status:404});
  }
}


//Update
export async function PUT(req, { params: { id } }) {
  const { first_name, last_name, birth_date, money_spent } = await req.json();
  const getByIdRes = await prisma.customers.findUnique({
    where: {
      customer_id: parseInt(id),
    },
  });
  if (!getByIdRes) {
    return NextResponse.json({
      status: 404,
      message: `Get customer ${id} is not founded.🥲`,
    },{status:404});
  }
  const updateRes = await prisma.customers.update({
    where: {
      customer_id: parseInt(id),
    },
    data: {
      first_name,
      last_name,
      birth_date,
      money_spent,
    },
  });
  return NextResponse.json({
    status: 200,
    message: `Customer with id ${id} is updated successfully.😍`,
    payload: updateRes,
  });
}


//Delete
export async function DELETE(req, { params: { id } }) {
  const getByIdRes = await prisma.customers.findUnique({
    where: {
      customer_id: parseInt(id),
    },
  });
  if (!getByIdRes) {
    return NextResponse.json({
      status: 404,
      message: `Get customer ${id} is not founded.🥲`,
    },{status:404});
  }
  const deleteRes = await prisma.customers.delete({
    where: {
      customer_id: parseInt(id),
    },
  });
  return NextResponse.json({
    status: 200,
    message: `The customer with id ${id} is deleted successfully.😍`,
  });
}
