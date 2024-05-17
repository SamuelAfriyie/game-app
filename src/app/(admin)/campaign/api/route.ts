import prisma from "@/app/db";

export async function GET() {
  const res = await prisma.campaign.findMany();
  const data = res.map((item) => {
    return {
      ...item,
      dateCreated: item.dateCreated.toISOString().split("T")[0],
    };
  });
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await prisma.campaign.create({
    data: { ...body },
  });
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  console.log("Body: ", body);
  try {
    const res = await prisma.campaign.update({
      where: { id: body.id },
      // data: { ...body },
      data: {
        name: body.name,
        duration: body.duration,
        numOfAttempts: body.numOfAttempts,
        passScore: body.passScore,
        games: body.games,
      },
    });
    return new Response(JSON.stringify(res), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}
