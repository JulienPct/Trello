import { z } from "zod";
import { Board } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { CreateBoardSchema } from "./schema";

export type TInputType = z.infer<typeof CreateBoardSchema>;
export type TReturnType = TActionState<TInputType, Board>;