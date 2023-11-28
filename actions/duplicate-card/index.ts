"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DuplicateCardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour supprimer une liste" };

  const { id, boardId } = data;

  let card;

  try {
    const cardToDuplicate = await db.card.findUnique({
      where: { id, list: { board: { orgId } } },
    });

    if (!cardToDuplicate) return { error: "La carte n'existe pas" };

    const lastCard = await db.card.findFirst({
      where: { listId: cardToDuplicate.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.card.create({
      data: {
        title: `${cardToDuplicate.title} - Copy`,
        description: cardToDuplicate.description,
        order: newOrder,
        listId: cardToDuplicate.listId,
      },
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la dupplication de la carte",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const duplicateCard = createSafeAction(DuplicateCardSchema, handler);
