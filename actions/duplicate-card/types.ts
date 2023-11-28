import { z } from "zod";
import { Card } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { DuplicateCardSchema } from "./schema";

export type TInputType = z.infer<typeof DuplicateCardSchema>;
export type TReturnType = TActionState<TInputType, Card>;