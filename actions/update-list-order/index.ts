"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateListOrderSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour mettre à jour un tableau" };

  const { items, boardId } = data;

  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: { id: list.id, board: { orgId } },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la réorganisation des listes",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrderSchema, handler);
