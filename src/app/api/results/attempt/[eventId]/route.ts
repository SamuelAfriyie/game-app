import { event } from "./../../../../../../node_modules/.prisma/client/index.d";
import prisma from "@/app/db";

export async function PATCH(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  const body = await request.json();
  const res = await prisma.result.update({
    where: {
      email: params.eventId,
      eventResults: {
        // some: {
        //   eventId: body.result.eventId,
        // },
      },
    },
    data: {},
  });
  if (res) {
    return new Response(
      JSON.stringify({ message: "Results created!", status: 201 }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Results not created!", status: 400 }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  }
}
