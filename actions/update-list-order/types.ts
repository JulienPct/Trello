import { z } from "zod";
import { List } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { UpdateListOrderSchema } from "./schema";

export type TInputType = z.infer<typeof UpdateListOrderSchema>;
export type TReturnType = TActionState<TInputType, List[]>;
