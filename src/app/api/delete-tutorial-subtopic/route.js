import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { selectedId } = await req.json();

    const TutorialSubtopicToDelete = await prisma.tutorialSubtopic.findUnique({
      where: {
        id: parseInt(selectedId),
      },
    });
    if (!TutorialSubtopicToDelete) {
      return NextResponse.error("Tutorial Sub topic not found", {
        status: 404,
      });
    }

    await prisma.tutorialSubtopic.delete({
      where: {
        id: parseInt(selectedId),
      },
    });

    return NextResponse.json({
      message: "Tutorial sub topic deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error("Failed to delete Tutorial sub topic", {
      status: 500,
    });
  }
}
