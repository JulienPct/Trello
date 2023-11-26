"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour mettre à jour un tableau" };

  const { title, id } = data;

  let board;

  try {
    board = await db.board.update({
      where: { id, orgId },
      data: { title },
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la mise à jour du tableau",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoardSchema, handler);
