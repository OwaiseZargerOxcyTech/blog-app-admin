import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const allTutorialSubtopics = await prisma.tutorialSubtopic.findMany();
    const response = NextResponse.json(allTutorialSubtopics);

    // Disable caching by setting Cache-Control header
    response.headers.set("Cache-Control", "no-cache");

    return response;
  } catch (err) {
    console.error("Error fetching all tutorial subtopics:", err);
    return NextResponse.error("Failed to fetch tutorial subtopics", {
      status: 500,
    });
  }
}
