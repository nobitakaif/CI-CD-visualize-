import { Elysia } from "elysia";
import { user } from "./modules/user";

const app = new Elysia({prefix : "/api/v1"})
  .use(user)
  .listen(8000)
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
