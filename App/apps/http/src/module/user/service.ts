
export abstract class AuthService{
    static async loginWithGithub({ code }: {code : string}){
        console.log(code ," code ")
        const token = await fetch("https://github.com/login/oauth/access_token",{
            method : "POST", 
            headers: {
                "Content-Type": "application/json",
                Accept : "application/json",
            },
            body : JSON.stringify({
                client_id : process.env.GITHUB_CLIENT_ID!,
                client_secret : process.env.GITHUB_CLIENT_SECRET!,
                code : code,
                redirect_uri : "http://localhost:8000/api/v1/auth/github/callback"
            }),
            
        })  
        // console.log(token)
        
        const tokenRes = await token.json()
        console.log(tokenRes)

        const userData = await fetch("https://api.github.com/user", {
            method : "GET",
            headers : {
                Authorization : `Bearer ${tokenRes.access_token}`,
                Accept : "application/json"
            }
        })
        const userDataRes = await userData.json()
        console.log(userDataRes)

        const userEmail = await fetch("https://api.github.com/user/emails", {
            method : "GET",
            headers: {
                Authorization: `Bearer ${tokenRes.access_token}`,
                Accept: "application/vnd.github+json",
            }
        })
        
        
        const emailRes = await userEmail.json()
        console.log("email res",emailRes[0].email)

        
        
        return {
            data : userData
        }
    }
}