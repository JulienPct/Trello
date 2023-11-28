"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateCardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import createAuditLog from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour créer une carte" };

  const { title, boardId, listId } = data;

  let card;

  try {
    const list = await db.list.findUnique({
      where: { id: listId, boardId, board: { orgId } },
    });

    if (!list) return { error: "La liste n'existe pas" };

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.card.create({
      data: { title, order: newOrder, listId },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la création de la carte",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCardSchema, handler);
