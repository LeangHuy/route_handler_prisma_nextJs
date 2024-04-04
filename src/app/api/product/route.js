import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Create new
export async function POST(req) {
  const { category_id, product_name, price } = await req.json();
  const checkCateId = await prisma.categories.findUnique({
    where: {
      category_id: parseInt(category_id),
    },
  });
  if (!checkCateId) {
    return NextResponse.json(
      {
        status: 404,
        message: `Category with id ${category_id} is not have.🥲`,
      },
      { status: 404 }
    );
  }
  const createRes = await prisma.products.create({
    data: {
      category_id,
      product_name,
      price,
    },
  });
  return NextResponse.json({
    status: 201,
    message: "A new product is created successfully.😍",
    payload: createRes,
  },{status:201});
}

//Get all product
export async function GET() {
  const getAllRes = await prisma.products.findMany();
  return NextResponse.json({
    status: 200,
    message: "Get all products successfully.😍",
    payload: getAllRes,
  });
}
