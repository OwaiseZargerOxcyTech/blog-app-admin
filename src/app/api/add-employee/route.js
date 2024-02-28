import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export async function POST(req) {
  try {
    const { email, username, password, access, action } = await req.json();

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newEmployee = await prisma.employee.create({
      data: { email, username, password, hashedPassword, access, action },
    });
    return NextResponse.json(newEmployee);
  } catch (err) {
    console.log(err);
  }
}
