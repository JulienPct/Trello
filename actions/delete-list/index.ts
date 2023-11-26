"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteListSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour supprimer une liste" };

  const { id, boardId } = data;

  let list;

  try {
    list = await db.list.delete({
      where: { id, boardId, board: { orgId } },
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la suppression de la liste",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
