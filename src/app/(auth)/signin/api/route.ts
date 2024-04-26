import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { NextApiResponse } from "next";
import { prisma } from "@/utils/data/prisma_instance";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { email, password } = await req.json();

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return new Response(
        JSON.stringify({ message: "Invalid input", status: 422 }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", status: 404 }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials!", status: 403 }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Logged in!", status: 200 }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    }
  } else {
    // Handle any non-POST requests
    JSON.stringify({ message: "Route not valid", status: 500 }),
      {
        headers: { "content-type": "application/json" },
      };
  }
}
