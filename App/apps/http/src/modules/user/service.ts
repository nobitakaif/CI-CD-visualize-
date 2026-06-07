import { prisma } from "@repo/db/client"

export abstract class AuthService{
    static async loginUser({ code } : {code : string }){
        const userAccessToken = await fetch("https://github.com/login/oauth/access_token", {
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                client_id : process.env.GITHUB_CLIENT_ID,
                client_secret : process.env.GITHUB_CLIENT_SECRET,
                code,
            })
        })

        const accessTokenData = await userAccessToken.json()
        console.log("accesstoken -> ",accessTokenData)

        const userRes = await fetch("https://api.github.com/user", {
            headers : {
                Authorization : `Bearer ${accessTokenData.access_token}`,
                Accept : "application/vnd.github+json"
            }
        }) 

        const user = await userRes.json()
        console.log("users -> ",user)

        const userEmail = await fetch("https://api.github.com/user/emails",{
            headers : {
                Authorization: `Bearer ${accessTokenData.access_token}`,
                Accept: "application/vnd.github+json"
            }
        })

        const emails = await userEmail.json();

        console.log("emails -> ",emails)
        
        
        console.log(emails)
        
        const res = await prisma.user.upsert({
            where: {
                githubId: user.id.toString()
            },
            create: {
                githubId: user.id.toString(),
                username: user.name,
                email: emails[0]?.email,
                avatarUrl: user.avatar_url,
                githubAccount : {
                    create : {
                        accessToken : accessTokenData.access_token,
                        refreshToken : accessTokenData.refresh_token,
                        username : user.name,
                        githubId : user.id.toString()
                    }
                }

            },
            update: {
                username : user.name,
                email: emails[0]?.email,
                avatarUrl: user.avatar_url,
                githubAccount : {
                    create : {
                        accessToken : accessTokenData.access_token,
                        refreshToken : accessTokenData.refresh_token,
                        username : user.name,
                        githubId : user.id.toString()
                    }
                }
            }
        });

        console.log(res)
        return {
            accessTokenData,
            code,
            user,
            emails,
            id : res.id
        }
    }
}