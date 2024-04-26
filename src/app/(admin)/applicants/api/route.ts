import { prisma } from "@/utils/data/prisma_instance";

export async function GET() {
  try {
    const applicants = await prisma.user.findMany();
    return Response.json(applicants);
  } catch (error) {
    return Response.json(error);
  }
}