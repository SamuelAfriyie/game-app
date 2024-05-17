import prisma from "@/app/db";

export async function GET() {
  const res = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  
  return Response.json(res);
}
