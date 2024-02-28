import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

export async function POST(req) {
  try {
    const prisma = new PrismaClient();

    const data = await req.formData();
    const title = data.get("title");
    const metaData = data.get("metaData");
    const image = data.get("image");
    const content = data.get("content");
    if (!image) {
      return NextResponse.json({ success1: false });
    }

    const slug = title
      .toLowerCase() // Convert the title to lowercase
      .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-");

    const filenameParts = image.name.split(".");
    const fileExtension = filenameParts[filenameParts.length - 1];

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/blog_images/${slug}.${fileExtension}`;
    await new Promise((resolve, reject) => {
      fs.writeFile(path, buffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const imagePath = `/blog_images/${slug}.${fileExtension}`;

    const result = await prisma.blog.create({
      data: {
        title: title,
        metaData: metaData,
        image: imagePath,
        content: content,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error during blog addition:", error);
    return NextResponse.json({ success1: false, error: "Failed to add blog" }, { status: 500 });
  }
}
