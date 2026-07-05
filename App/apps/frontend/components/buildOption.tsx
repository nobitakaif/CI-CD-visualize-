
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const option = ["docker", "kubernetes"]

export default function BuildOption(){
    
    return <div className="absolute h-screen w-full flex justify-center items-center bg-transparent ">
        <Card className="h-77 w-77">
            <CardContent className="flex justify-center items-center h-full gap-3 flex-col w-full  ">
                {option.map(( btn ) =>(<Button className="p-2 w-44 text-lg cursor-pointer ">{btn}</Button>))}
            </CardContent>
        </Card>
    </div>
}