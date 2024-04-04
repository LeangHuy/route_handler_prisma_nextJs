import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Get all Category
export async function GET() {
  const getAllRes = await prisma.categories.findMany();
  return NextResponse.json({
    status: 200,
    message: "Get all categories successfully.😍",
    payload: getAllRes,
  });
}

//Create new category
export async function POST(req) {
  let count = 0;
  const checkNameExist = await prisma.categories.findMany();
  const body = await req.json();
  checkNameExist.map((allName) => {
    body.map((reqName) => {
      if (allName.category_name === reqName.category_name) {
        count++;
      }
    });
  });
  if (count >= 1) {
    return NextResponse.json(
      {
        status: 409,
        message: `Category name is already have.❌`,
      },
      { status: 409 }
    );
  }

  const createRes = await prisma.categories.createMany({
    data: body,
    skipDuplicates: false,
  });

  return NextResponse.json(
    {
      status: 201,
      message: "A new categories is created successfully.😍",
      payload: createRes,
    },
    { status: 201 }
  );
}
