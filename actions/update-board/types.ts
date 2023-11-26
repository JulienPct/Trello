import { z } from "zod";
import { Board } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { UpdateBoardSchema } from "./schema";

export type TInputType = z.infer<typeof UpdateBoardSchema>;
export type TReturnType = TActionState<TInputType, Board>;