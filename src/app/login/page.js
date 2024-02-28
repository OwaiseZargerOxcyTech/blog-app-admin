"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        throw new Error("Wrong Credentials...");
      }

      router.replace("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100 rounded"
      style={{
        overflowY: "scroll",
        scrollbarColor: "white white",
        scrollbarWidth: "thin",
        height: "100vh",
      }}
    >
      <form
        className="bg-white p-8 shadow-md w-96 rounded"
        onSubmit={handleLogin}
        style={{ width: 500 }}
      >
        <br />
        <h4 className="text-2xl mb-4">
          <b>Sign in to account</b>
        </h4>
        <p style={{ fontFamily: "sans-serif", color: "gray" }}>
          Enter your username & password to login
        </p>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="Test@gmail.com"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="******"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-900 text-white rounded py-2 px-4 hover:bg-blue-600"
          style={{ width: 435 }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Page;
