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
      return Response.json({ message: "Invalid input" }, { status: 422 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) { 
      return Response.json({ message: "User not found!" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) { 
      return Response.json({ message: "Invalid credentials!" }, { status: 403 });
    } else { 
      return Response.json({ message: "Logged in!" }, { status: 200 });
    }
  } else {
    // Handle any non-POST requests 
    return Response.json({ message: "Route not valid" }, { status: 500 });
  }
}
