import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { selectedId } = await req.json();

    const employeeToDelete = await prisma.employee.findUnique({
      where: {
        id: parseInt(selectedId),
      },
    });
    if (!employeeToDelete) {
      return NextResponse.error("Employee not found", { status: 404 });
    }

    await prisma.employee.delete({
      where: {
        id: parseInt(selectedId),
      },
    });

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.error("Failed to delete employee", { status: 500 });
  }
}
