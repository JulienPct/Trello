import { z } from "zod";

import { TActionState } from "@/lib/create-safe-action";

import { UpdateCardOrderSchema } from "./schema";
import { Card } from "@prisma/client";

export type TInputType = z.infer<typeof UpdateCardOrderSchema>;
export type TReturnType = TActionState<TInputType, Card[]>;
