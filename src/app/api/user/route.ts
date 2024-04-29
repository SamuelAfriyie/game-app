import prisma from "@/app/db";
import { generateUsername } from "@/utils/func/date_extensions";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await prisma.user.create({
    data: {
      ...body,
      role: "ADMIN",
      username: generateUsername(body.firstName),
      educationalLevel: "None",
    },
  });
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
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
