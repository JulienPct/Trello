"use server";

import { auth } from "@clerk/nextjs";
import { TInputType, TReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSaveAction } from "@/lib/create-safe-action";
import { CreateBoardSchema } from "./schema";

const handler = async (data: TInputType): Promise<TReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return { error: "Vous devez être connecté pour créer un tableau" };

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  )
    return { error: "L'image est manquante. Échec de la création du tableau" };

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName,
      },
    });
  } catch (error) {
    return { error: "Une erreur est survenue lors de la création du tableau" };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSaveAction(CreateBoardSchema, handler);
