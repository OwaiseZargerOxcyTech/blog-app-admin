"use client";
import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div
      className={cn(
        `sticky bg-white inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Admin</span>
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          <picture>
            <img
              src="/man-smiling.jpg"
              className="rounded-full h-8 border-2 border-white shadow-sm"
              alt="profile picture"
            />
          </picture>
          {session && (
            <button
              className="bg-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold py-1 px-2 rounded"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
