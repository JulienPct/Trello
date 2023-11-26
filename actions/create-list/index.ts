"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateListSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour mettre à jour un tableau" };

  const { title, boardId } = data;

  let list;

  try {
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });

    if (!board) return { error: "Le tableau n'existe pas" };

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: { title, boardId, order: newOrder },
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la création de la liste",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateListSchema, handler);
