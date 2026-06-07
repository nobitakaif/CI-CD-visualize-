import Elysia from "elysia";
import { AuthService } from "./service";


export const user = new Elysia({prefix : "auth"})
    .get("/github", async () =>{
        const params = new URLSearchParams({
            client_id : process.env.GITHUB_CLIENT_ID!,
            scope : "read:user user:email"
        })
        return Response.redirect(`https://github.com/login/oauth/authorize?${params}`)
    })
    .get("/github/callback", async({query})=>{
        const code = query.code
        const res = await AuthService.loginUser({ code })
        return {
            data : res.accessTokenData,
            code : code,
            user : res.user,
            emails : res.emails,
            id : res.id
        }
    })