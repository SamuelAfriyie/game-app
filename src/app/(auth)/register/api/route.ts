import bcrypt from "bcryptjs";
import { prisma } from "@/utils/data/prisma_instance";

const generateUsername = (firstName: string): string => {
    const randomSuffix = Math.floor(Math.random() * 1000);
    const username = `${firstName.toLowerCase().replace(/\s/g, "")}${randomSuffix}`;
    return username;
};

export const POST = async (req: Request) => {
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
        return Response.json({ message: "Invalid input" }, { status: 422 });
      }

      const hashedPassword = await bcrypt.hash(b.password, 12);

      const existingUser = await prisma.user.findFirst({
        where: {
          email: b.email,
        },
      });

      if (existingUser) {
        return Response.json(
          { message: "User already exists" },
          { status: 422 }
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

      return Response.json({ message: "User created!" }, { status: 201 });
    } else {
      return Response.json({ message: "Route not valid" }, { status: 500 });
    }
  } catch (error) {
    return {
      data: error,
      success: false,
    };
  }
};
