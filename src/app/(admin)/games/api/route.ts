import { prisma } from "@/utils/data/prisma_instance";

export async function GET() {
  try {
    const gameConfigs = await prisma.game.findMany();
    return Response.json(gameConfigs);
  } catch (error) {
    return Response.json(error);
  }
}

