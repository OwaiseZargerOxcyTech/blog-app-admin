import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

export async function PUT(req) {
  const prisma = new PrismaClient();
  try {
    const data = await req.formData();
    const image = data.get("image");
    const title = data.get("title");
    const metaData = data.get("metaData");
    const content = data.get("content");
    const selectedId = data.get("selectedId");
    const previousimage = data.get("previousimage");
    if (!image) {
      return NextResponse.json({ success1: false });
    }

    const slug = title
      .toLowerCase() // Convert the title to lowercase
      .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-");

    if (typeof image === "object") {
      const previousImagePath = `./public/${previousimage}`;

      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath); // Delete the previous image file
      }

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

      const result = await prisma.blog.update({
        where: { id: Number(selectedId) },
        data: {
          title: title,
          metaData: metaData,
          image: imagePath,
          content: content,
        },
      });

      return NextResponse.json(result);
    }

    if (typeof image === "string") {
      const previousImagePath = `./public/${previousimage}`;

      const fileExtension = path.extname(previousImagePath);

      const trimmedExtension = fileExtension.replace(".", "");

      const newPath = `./public/blog_images/${slug}.${trimmedExtension}`;

      if (fs.existsSync(previousImagePath)) {
        fs.renameSync(previousImagePath, newPath); // Rename the previous image file
      }

      const newImagePath = `/blog_images/${slug}.${trimmedExtension}`;

      const result = await prisma.blog.update({
        where: { id: Number(selectedId) },
        data: {
          title: title,
          metaData: metaData,
          image: newImagePath,
          content: content,
        },
      });

      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Error during blog addition:", error);
    return NextResponse.json({ success1: false, error: "Failed to add blog" }, { status: 500 });
  }
}
