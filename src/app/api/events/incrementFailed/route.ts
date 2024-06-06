import prisma from "@/app/db";
import { APIResponse } from "@/utils/func/api_reponse";

export async function PUT(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const res = await prisma.event.update({
    where: {
      id: searchParams.get("eventId")!,
    },
    data: {
      totFailed: { increment: 1 },
    },
  });

  if (res) {
    return APIResponse.updated(res);
  } else {
    return APIResponse.badRequest();
  }
}