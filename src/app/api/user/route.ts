import prisma from "@/app/db";
import bcrypt from "bcryptjs";
import { generateUsername } from "@/utils/func/date_extensions";
import { APIResponse } from "@/utils/func/api_reponse";

export async function POST(request: Request) {
  const body = await request.json();
  const hashedPassword = await bcrypt.hash(body.password, 12);

  const existingUser = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return APIResponse.validationError("Email already exists");
  }

  const res = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      location: body.location,
      password: hashedPassword,
      role: "ADMIN",
      username: generateUsername(body.firstName),
      educationalLevel: "None",
    },
  });

  return APIResponse.created(res);
}

export async function GET() {
  try {
    const applicants = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        location: true,
        educationalLevel: true,
      },
    });
    return Response.json(applicants);
  } catch (error) {
    return Response.json(error);
  }
}
