import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const allBlogs = await prisma.blog.findMany();
    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error("Error during getting blogs data:", error);
    return NextResponse.json({ success1: false, error: "Failed to get blogs data" }, { status: 500 });
  }
}
