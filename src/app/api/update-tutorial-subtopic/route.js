import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const { selectedId, title, metadata, content } = await req.json();

    const TutorialSubtopicToUpdate = await prisma.tutorialSubtopic.findUnique({
      where: {
        id: parseInt(selectedId),
      },
    });
    if (!TutorialSubtopicToUpdate) {
      return NextResponse.error("subtopic not found", { status: 404 });
    }

    const UpdatedTutorialSubtopic = await prisma.tutorialSubtopic.update({
      where: {
        id: parseInt(selectedId),
      },
      data: {
        title,
        metadata,
        content,
      },
    });

    return NextResponse.json(UpdatedTutorialSubtopic);
  } catch (err) {
    console.log(err);
    return NextResponse.error("Failed to update tutorial subtopic", {
      status: 500,
    });
  }
}
