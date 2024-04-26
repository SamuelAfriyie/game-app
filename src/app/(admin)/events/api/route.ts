import { prisma } from "@/utils/data/prisma_instance";


export async function GET() {
  const res = await prisma.event.findMany();
  return Response.json(res);
}

export async function POST(request: Request) {
  const body = await request.json(); 
  const res = await prisma.event.create({
    data: { ...body },
  });
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}