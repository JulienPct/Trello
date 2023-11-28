import { z } from "zod";
import { Card } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { UpdateCardSchema } from "./schema";

export type TInputType = z.infer<typeof UpdateCardSchema>;
export type TReturnType = TActionState<TInputType, Card>;