import Elysia, { t } from "elysia";
import { AuthService } from "./service";


export const userAuth = new Elysia({prefix : "/auth"})
    .get("/github", async () =>{
        const params = new URLSearchParams({
            client_id :  process.env.GITHUB_CLIENT_ID!,
            scope : "read:user user:email"
        })

        return Response.redirect(`https://github.com/login/oauth/authorize?${params}`)
    })
    .get("/github/callback", async({ query })=>{
        const { code } = query

        const res = AuthService.loginWithGithub({ code })
        
        return {
            code : code,
            data : (await res).data
        }
    },{
        query : t.Object({
            code : t.String()
        })
    })