import prisma from "@/app/db";
import { getSeverSession } from "@/hooks/custom/use_session";
import { APIResponse } from "@/utils/func/api_reponse";

export async function POST(request: Request) {
  const eventResults = await request.json();
  console.log(eventResults);
  const info = (await getSeverSession("info")) as any;
  const res = await prisma.result.create({
    data: {
      username: info.username,
      email: info.email,
      eventResults: {
        create: [eventResults],
      },
    },
  });
  if (res) {
    return APIResponse.created(res);
  } else {
    return APIResponse.badRequest();
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const res = await prisma.result.update({
    where: {
      email: body.email,
      eventResults: {
        some: {
          eventId: body.eventResults.eventId,
        },
      },
    },
    data: {
      eventResults: {
        create: body.eventResults,
      },
    },
  });
  if (res) {
    return new Response(
      JSON.stringify({ message: "Results updated!", status: 200 }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Results not updated!", status: 400 }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const res = await prisma.eventResults.findUnique({
    where: {
      eventId: searchParams.get("eventId")!,
      userId: searchParams.get("default")!,
    },
    select: {
      decision: true,
      level: true,
      attemptCount: true,
    },
  });
  return APIResponse.success(res);
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
      attemptCount: {
        decrement: 1,
      },
    },
  });
  return APIResponse.success(res);
}
