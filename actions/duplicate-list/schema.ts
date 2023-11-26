import { z } from "zod";

export const DuplicateListSchema = z.object({
    id: z.string(),
    boardId: z.string(),
});
