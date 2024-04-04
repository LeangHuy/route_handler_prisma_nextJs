import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { check } from "prisma";

//Get by id or name
export async function GET(req, { params: { id } }) {
  if (Number.isInteger(parseInt(id))) {
    const getById = await prisma.categories.findUnique({
      where: {
        category_id: parseInt(id),
      },
    });
    if (getById) {
      return NextResponse.json({
        status: 200,
        message: `Get category by id (${id}) successfully.😍`,
        payload: getById,
      });
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Get category by id (${id}) is not founded.🥲`,
        },
        { status: 404 }
      );
    }
  } else {
    const getByName = await prisma.categories.findMany({
      where: {
        category_name: {
          // contains: id,
          in: [id],
          mode: "insensitive",
        },
      },
    });
    if (getByName.length > 0) {
      return NextResponse.json({
        status: 200,
        message: `Get category (${id}) successfully.😍`,
        payload: getByName,
      });
    } else {
      return NextResponse.json(
        {
          status: 404,
          message: `Get category (${id}) not founded.🥲`,
        },
        { status: 404 }
      );
    }
  }
}

//Update
export async function PUT(req, { params: { id } }) {
  const getById = await prisma.categories.findUnique({
    where: {
      category_id: parseInt(id),
    },
  });
  if (!getById) {
    return NextResponse.json(
      {
        status: 404,
        message: `Get category ${id} is not founded.🥲`,
      },
      { status: 404 }
    );
  }
  const category_name = await req.json();
  let valid = 0;
  const checkNameExist = await prisma.categories.findMany();
  checkNameExist.map((getAllName) => {
    if (getAllName.category_name === category_name.category_name) {
      valid++;
    }
  });
  if (valid >= 1) {
    return NextResponse.json(
      {
        status: 409,
        message: `Category name is already have.🥲`,
      },
      {
        status: 409,
      }
    );
  }
  const updateRes = await prisma.categories.update({
    where: {
      category_id: parseInt(id),
    },
    data: category_name,
  });

  return NextResponse.json({
    status: 200,
    message: `Category with id ${id} is updated successfully.😍`,
    payload: updateRes,
  });
}
