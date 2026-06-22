import { treaty } from "@elysia/eden";
import { App } from "@repo/http/app";

export const client = treaty<App>("localhost:8000")