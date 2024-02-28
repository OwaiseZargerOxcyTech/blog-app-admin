import { NextResponse } from "next/server";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOption = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const { username, password } = credentials;
          if (!username || !password) {
            return null;
          }

          let admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) {
            return null;
          }
          if (admin.password === password) {
            return NextResponse.json(admin);
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
//authoption
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
