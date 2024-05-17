import prisma from "@/app/db";

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

export async function PUT(request: Request) {
  const body = await request.json();
  const res = await prisma.event.update({
    where: { id: body.id },
    // data: { ...body },
    data: {
      name: body.name,
      startDate: body.startDate,
      endDate: body.endDate,
      campaign: body.campaign,
    },
  });
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}
