import { z } from "zod";

export const UpdateCardSchema = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "La description est requise",
        invalid_type_error: "La description doit être une chaîne de caractères",
      })
      .min(3, { message: "La description doit contenir au moins 3 caractères" })
  ),
  title: z.optional(
    z
    .string({
      required_error: "Le titre est requis",
      invalid_type_error: "Le titre doit être une chaîne de caractères",
    })
    .min(3, { message: "Le titre doit contenir au moins 3 caractères" })
  ),
  id: z.string(),
});
