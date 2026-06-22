import { Elysia } from "elysia";
import { userAuth } from "./module/user";
import { cors } from "@elysia/cors"

export const app = new Elysia({prefix : '/api/v1'})
  .use(cors({
    origin : "http://localhost:3000"
  }))
  .use(userAuth)

export type App = typeof app
