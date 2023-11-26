"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DuplicateListSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour supprimer une liste" };

  const { id, boardId } = data;

  let list;

  try {
    const listToDuplicate = await db.list.findUnique({
      where: { id, boardId, board: { orgId } },
      include: { cards: true },
    });

    if (!listToDuplicate) return { error: "Liste introuvable" };

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToDuplicate.boardId,
        title: `${listToDuplicate.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToDuplicate.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la dupplication de la liste",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const duplicateList = createSafeAction(DuplicateListSchema, handler);
