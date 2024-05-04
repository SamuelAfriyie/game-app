import prisma from "@/app/db";

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
      data: {
        Title: body.Title as string,
        Difficulty: body.Difficulty as string,
        PointAllocated: body.PointAllocated as string,
        RateOfCompletion: body.RateOfCompletion as string,
      },
    });

    return new Response(JSON.stringify(res), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.log("Error: ", error);
    return Response.json(error);
  }
}
