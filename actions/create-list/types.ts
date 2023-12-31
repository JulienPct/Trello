import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { CreateListSchema } from "./schema";

export type TInputType = z.infer<typeof CreateListSchema>;
export type TReturnType = TActionState<TInputType, List>;
