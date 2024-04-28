import prisma from "@/app/db";


export async function GET() {
  try {
    const applicants = await prisma.user.findMany();
    return Response.json(applicants);
  } catch (error) {
    return Response.json(error);
  }
}