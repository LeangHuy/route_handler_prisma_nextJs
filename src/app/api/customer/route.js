import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Create new
export async function POST(req) {
  const { first_name, last_name, birth_date, money_spent } = await req.json();
  const createRes = await prisma.customers.create({
    data: {
      first_name,
      last_name,
      birth_date,
      money_spent,
    },
  });
  return NextResponse.json({
    status: 201,
    message: "A new customer is created successfully.😍",
    payload: createRes,
  },{status:201});
}

//Get all
export async function GET() {
  const getAllRes = await prisma.customers.findMany();
  return NextResponse.json({
    status: 200,
    message: "Get all customers successfully.😍",
    payload: getAllRes,
  });
}
