import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { title, metadata, content } = await req.json();

    const newSubtopic = await prisma.tutorialSubtopic.create({
      data: { title, metadata, content },
    });
    return NextResponse.json(newSubtopic);
  } catch (err) {
    console.log(err);
    return NextResponse.error("Failed to Add Tutorial subtopic", {
      status: 500,
    });
  }
}
