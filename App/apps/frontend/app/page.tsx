"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home(){
  async function connectGithub(){
    const res = await axios.get("http://localhost:8000/api/v1/auth/github/")
 
  }
  return <div className="h-screen w-full flex flex-col justify-center items-center">
    Home page
    <a href="http://localhost:8000/api/v1/auth/github">
        <Button className="p-4 text-lg cursor-pointer"
        >Connect with GitHub </Button>
    </a>
  </div>
}