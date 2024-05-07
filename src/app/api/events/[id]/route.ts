import prisma from "@/app/db";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const res: any[] = await prisma.event.findMany({
    where: { id: params.id },
    select: {
      campaign: true,
    },
  }); 
  return Response.json(res[0].campaign?.games);
}
