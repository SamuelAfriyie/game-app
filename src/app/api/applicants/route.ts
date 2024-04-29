import prisma from "@/app/db";

export async function GET() {
  try {
    const applicants = await prisma.user.findMany({
      where: {
        role: "APPLICANT",
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
