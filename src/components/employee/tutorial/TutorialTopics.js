"use client";
import CommonTable from "@/components/common/CommonTable";
import React, { useMemo } from "react";
import Link from "next/link";

const TutorialTopics = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_no",
        header: "Sr. No.",
        enableEditing: false,
        size: 100,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
    ],
    []
  );

  const tutData = useMemo(
    () => [
      {
        sr_no: 1,
        title: (
          <Link
            href="/tutorial/html"
            className="text-blue-500 underline font-bold"
          >
            HTML
          </Link>
        ),
      },
    ],
    []
  );

  return <CommonTable columns={columns} data={tutData} />;
};

export default TutorialTopics;
