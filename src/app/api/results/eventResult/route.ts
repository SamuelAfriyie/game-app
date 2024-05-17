import prisma from "@/app/db";
import { getSeverSession } from "@/hooks/custom/use_session";
import { APIResponse } from "@/utils/func/api_reponse";

export async function GET() {
  const res = await prisma.result.findMany({
    include: {
      eventResults: true,
    },
  });
  return APIResponse.updated(res);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const userId = (await getSeverSession("id")) as any;
  const res = await prisma.eventResults.update({
    where: {
      eventId: body.eventId,
      userId: userId,
    },
    data: {
      level: body.attempt.level,
      score: body.attempt.score,
      decision: body.decision,
      attempts: {
        push: body.attempt,
      },
    },
  });
  return APIResponse.updated(res);
}
