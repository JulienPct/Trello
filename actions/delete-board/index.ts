"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour supprimer un tableau" };

  const { id } = data;

  let board;

  try {
    board = await db.board.delete({
      where: { id, orgId },
    });
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la suppression du tableau",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);
