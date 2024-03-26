'use client'

import { useRouter } from "next/navigation"

export default function DetailLink(props){
    const router = useRouter()  

    return(
        <button className="title" onClick={()=>{router.push(`/detail/${props.id}`)}}>{props.title}</button>
    )
}