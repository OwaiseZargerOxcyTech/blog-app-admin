import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export async function PUT(req) {
  try {
    const { selectedId, email, username, password, access, action } =
      await req.json();

    const employeeToUpdate = await prisma.employee.findUnique({
      where: {
        id: parseInt(selectedId),
      },
    });
    if (!employeeToUpdate) {
      return NextResponse.error("Employee not found", { status: 404 });
    }

    // Hash the new password if provided
    let hashedPassword = employeeToUpdate.hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: parseInt(selectedId),
      },
      data: {
        email,
        username,
        password,
        hashedPassword,
        access,
        action,
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (err) {
    console.log(err);
    return NextResponse.error("Failed to update employee", { status: 500 });
  }
}
