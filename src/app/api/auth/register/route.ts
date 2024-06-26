import bcrypt from "bcryptjs";
import prisma from "@/app/db";
import { generateUsername } from "@/utils/func/date_extensions";

export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const b = await req.json();

      if (
        !b.email ||
        !b.email.includes("@") ||
        !b.password ||
        b.password.trim().length < 7 ||
        b.password !== b.password.trim() ||
        b.phoneNumber.trim().length < 10 ||
        b.educationalLevel.trim().length < 1 ||
        b.firstName.trim().length < 1 ||
        b.lastName.trim().length < 1 ||
        b.password.trim() !== b.confirmPassword.trim()
      ) {
        return new Response(
          JSON.stringify({ message: "Invalid input", status: 422 }),
          {
            headers: { "content-type": "application/json" },
          }
        );
      }

      const hashedPassword = await bcrypt.hash(b.password, 12);

      const existingUser = await prisma.user.findFirst({
        where: {
          email: b.email,
        },
      });

      if (existingUser) {
        return new Response(
          JSON.stringify({ message: "User already exists", status: 422 }),
          {
            headers: { "content-type": "application/json" },
          }
        );
      }

      await prisma.user.create({
        data: {
          email: b.email,
          password: hashedPassword,
          phoneNumber: b.phoneNumber,
          educationalLevel: b.educationalLevel,
          firstName: b.firstName,
          lastName: b.lastName,
          username: generateUsername(b.firstName),
          location: b.location,
        },
      });

      return new Response(
        JSON.stringify({ message: "User created!", status: 201 }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Route not valid", status: 500 }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ data: error, status: 500 }), {
      headers: { "content-type": "application/json" },
    });
  }
}
