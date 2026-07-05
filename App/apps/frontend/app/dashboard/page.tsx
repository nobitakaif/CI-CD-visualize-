import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { treaty } from "@elysia/eden";
import { App } from "@repo/http/app";
import { redirect } from "next/navigation";


                         
const client = treaty<App>("http://localhost:8000");

export default async function Home() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("auth");
  
 
  const headers: Record<string, string> = {};
  if (sessionCookie?.value) {
    headers["Cookie"] = `${sessionCookie.name}=${sessionCookie.value}`;
  }

  
  const res = await client.api.v1.auth.me.get({
    headers,
  });
  if(res.data?.userId){
    redirect("/")
  } 
  console.log(res);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      Home page
      <Link href="http://localhost:8000/api/v1/auth/github">
        <Button className="p-4 text-lg cursor-pointer">
          Connect with GitHub
        </Button>
      </Link>
    </div>
  );
}   