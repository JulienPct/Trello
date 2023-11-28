import { z } from "zod";

export const DuplicateCardSchema = z.object({
    id: z.string(),
    boardId: z.string(),
});
