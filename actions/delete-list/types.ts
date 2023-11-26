import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { DeleteListSchema } from "./schema";

export type TInputType = z.infer<typeof DeleteListSchema>;
export type TReturnType = TActionState<TInputType, List>;