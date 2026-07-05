"use client"
import { Button } from '@/components/ui/button';
import {
  ReactFlow,
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default async function Page({params} : {params : Promise<{workflows : string}>}){
    const { workflows } = await params
    console.log( workflows )
    return <div className="text-green-400 h-screen w-full">
    
    <ReactFlow>
      <Background className='h-screen w-full' />
      <Button className='w-33 cursor-pointer' onClick={() =>{
        alert("alright")
      }}>Open Panel</Button>
    </ReactFlow>
    </div>
}