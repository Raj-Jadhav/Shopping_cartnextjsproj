import { z } from "zod";
export const formSchema = z.object({name: z.string().min(2,"Too Short!").max(50,"Too Long!"), description: z.string().min(2,"Too Short!").max(500,"Too Long!")})