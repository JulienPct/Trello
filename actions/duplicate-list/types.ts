import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { DuplicateListSchema } from "./schema";

export type TInputType = z.infer<typeof DuplicateListSchema>;
export type TReturnType = TActionState<TInputType, List>;