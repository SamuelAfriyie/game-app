import prisma from "@/app/db";

export async function GET(req: Request) {
  const param = new URL(req.url).searchParams; 
  const res = await prisma.result.findMany({
    include: {
      eventResults: {
        where: {
          eventId: param.get("eventId")!,
        },
        orderBy: {
          score: "desc",
        },
        select: {
          score: true,
        },
      },
    },
  });

  return Response.json(res);
}
