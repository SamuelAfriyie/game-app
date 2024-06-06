import prisma from "@/app/db";

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await _request.json();
    const res = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        location: body.location,
      },
    });
    return new Response(JSON.stringify(res), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return Response.json(error);
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return new Response(JSON.stringify(user), {
    headers: { "content-type": "application/json" },
  });
}
