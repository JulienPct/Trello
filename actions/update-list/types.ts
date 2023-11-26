import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { UpdateListSchema } from "./schema";

export type TInputType = z.infer<typeof UpdateListSchema>;
export type TReturnType = TActionState<TInputType, List>;
