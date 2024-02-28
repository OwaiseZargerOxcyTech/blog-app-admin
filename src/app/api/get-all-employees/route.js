import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(res) {
  try {
    const allEmployees = await prisma.employee.findMany();
    return NextResponse.json(allEmployees);
  } catch (err) {
    console.error("Error fetching all employees:", err);
    return NextResponse.error("Failed to fetch employees", { status: 500 });
  }
}
