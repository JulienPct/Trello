import { z } from "zod";
import { Board } from "@prisma/client";

import { TActionState } from "@/lib/create-safe-action";

import { DeleteBoardSchema } from "./schema";

export type TInputType = z.infer<typeof DeleteBoardSchema>;
export type TReturnType = TActionState<TInputType, Board>;