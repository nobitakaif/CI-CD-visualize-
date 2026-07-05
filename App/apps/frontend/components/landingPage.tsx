"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import BuildOption from "./buildOption";

export default function LandingPage(){
    const [isOpen, setIsOpen ] = useState(false)
    return <div className="h-screen w-full flex justify-center items-center">
        <Button className="py-5 w-44" onClick={()=>{
            setIsOpen(true)
        }}>Create Workflows</Button>
        {
            isOpen && <BuildOption/>
        }
    </div>
}