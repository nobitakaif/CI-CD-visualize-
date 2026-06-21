import Elysia, { t } from "elysia";
import { AuthService } from "./service";
import jwt from "@elysia/jwt";

export const userAuth = new Elysia({prefix : "/auth"})
    .get("/github", async () =>{
        const params = new URLSearchParams({
            client_id :  process.env.GITHUB_CLIENT_ID!,
            scope : "read:user user:email"
        })

        return Response.redirect(`https://github.com/login/oauth/authorize?${params}`)
    })
    .use(
        jwt({
            name : 'jwt',
            secret : process.env.JWT_SECRET!
        })
    )
    .get("/github/callback", async({ query, cookie : { auth },  jwt})=>{
        const { code } = query

        const res = await AuthService.loginWithGithub({ code })
        
        if(res.success){
            const token = await jwt.sign({sub : res.userId})
            auth.set({
                value : token,
                maxAge : 7 * 86400,
                httpOnly : true,
                secure : true
            })
            return Response.redirect("http://localhost:3000/dashboard")
        }

        return Response.redirect(
            "http://localhost:3000/error"
        );
    },{
        query : t.Object({
            code : t.String()
        })
    })