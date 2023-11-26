import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
      invalid_type_error: "Le titre doit être une chaîne de caractères",
    })
    .min(3, "Le titre doit contenir au moins 3 caractères"),
});
