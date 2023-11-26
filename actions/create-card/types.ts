import { z } from "zod";
import { Card, List } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { CreateCardSchema } from "./schema";

export type TInputType = z.infer<typeof CreateCardSchema>;
export type TReturnType = TActionState<TInputType, Card>;
