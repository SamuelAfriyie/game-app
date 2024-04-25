import { prisma } from "@/utils/data/prisma_instance";

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _request.json();
    const res = await prisma.game.update({
      where: {
        id: params.id,
      },
      data: { ...body },
    });
    return new Response(JSON.stringify(res), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return Response.json(error);
  }
}
