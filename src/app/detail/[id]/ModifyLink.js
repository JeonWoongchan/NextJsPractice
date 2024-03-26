'use client'

import { useRouter } from "next/navigation"

export default function ModifyLink(props){
    const router = useRouter()  

    return(
        <button onClick={()=>{router.push(`/write/${props.id}`)}}>수정</button>
    )
}