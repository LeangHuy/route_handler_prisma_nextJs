import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

//Get by id or name
export async function GET(req, { params: { id } }) {
  if (Number.isInteger(parseInt(id))) {
    const getByIdRes = await prisma.products.findUnique({
      where: {
        product_id: parseInt(id),
      },
    });
    if (getByIdRes) {
      return NextResponse.json({
        status: 200,
        message: `Get product by id ${id} successfully.😍`,
        payload: getByIdRes,
      });
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Get product by id ${id} is not founded.🥲`,
        },
        { status: 404 }
      );
    }
  } else {
    const getByNameRes = await prisma.products.findFirst({
      where: {
        product_name: {
          contains: id,
          mode: "insensitive",
        },
      },
    });
    if (getByNameRes) {
      return NextResponse.json({
        status: 200,
        message: `Get product by name ${id} successfully.😍`,
        payload: getByNameRes,
      });
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Get product by name ${id} is not founded.🥲`,
        },
        { status: 404 }
      );
    }
  }
}

//Update
export async function PUT(req, { params: { id } }) {
  const getByIdRes = await prisma.products.findUnique({
    where: {
      product_id: parseInt(id),
    },
  });
  if (!getByIdRes) {
    return NextResponse.json(
      {
        status: 404,
        message: `Get product by id ${id} is not founded.🥲`,
      },
      { status: 404 }
    );
  }
  const { category_id, product_name, price } = await req.json();
  const updateRes = await prisma.products.update({
    where: {
      product_id: parseInt(id),
    },
    data: {
      category_id,
      product_name,
      price,
    },
  });
  return NextResponse.json({
    status: 200,
    message: `Product with id ${id} is updated successfully.😍`,
    payload: updateRes,
  });
}

//Delete
export async function DELETE(req, { params: { id } }) {
  const getByIdRes = await prisma.products.findUnique({
    where: {
      product_id: parseInt(id),
    },
  });
  if (!getByIdRes) {
    return NextResponse.json(
      {
        status: 404,
        message: `Get product by id ${id} is not founded.🥲`,
      },
      { status: 404 }
    );
  }
  const deleteRes = await prisma.products.delete({
    where: {
      product_id: parseInt(id),
    },
  });
  return NextResponse.json({
    status: 200,
    message: `The product with id ${id} is deleted successfully.😍`,
  });
}
