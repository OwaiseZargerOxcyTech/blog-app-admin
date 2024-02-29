import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const allTutorialSubtopics = await prisma.tutorialSubtopic.findMany();
    return NextResponse.json(allTutorialSubtopics);
  } catch (err) {
    console.error("Error fetching all tutorial subtopics:", err);
    return NextResponse.error("Failed to fetch tutorial subtopics", {
      status: 500,
    });
  }
}
