import { z } from "zod";

export const UpdateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
      invalid_type_error: "Le titre doit être une chaîne de caractères",
    })
    .min(3, { message: "Le titre doit contenir au moins 3 caractères" }),
    id: z.string(),
});
