import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(res) {
  try {
    const allTutorialSubtopics = await prisma.tutorialSubtopic.findMany();
    const response = NextResponse.json(allTutorialSubtopics);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (err) {
    console.error("Error fetching all tutorial subtopics:", err);
    return NextResponse.error("Failed to fetch tutorial subtopics", {
      status: 500,
    });
  }
}
