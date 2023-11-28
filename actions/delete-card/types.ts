import { z } from "zod";
import { Card } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { DeleteCardSchema } from "./schema";

export type TInputType = z.infer<typeof DeleteCardSchema>;
export type TReturnType = TActionState<TInputType, Card>;