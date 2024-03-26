'use client'

import React, { useEffect, useState } from 'react';

export default function ThumbsUpPost(props) {
    const [thumbsUpPostCount, setThumbsUpPostCount] = useState(null)

    const thumbsUpPost = ()=>{//추천하기
        fetch('/api/thumbs-up-post', {method :'POST', body : props.id})
        .then((r)=>{
            if(r.status == 200){
                selectThumbUpPost()
            }else if(r.status == 400){
                alert('추천은 한번만')
            }else if(r.status == 500){
                alert('로그인 하셈')
            }
        })
    }

    const selectThumbUpPost = ()=>{//추천수 받아오기
        fetch('/api/selectThumbsUpPost', {method :'POST', body : props.id}).then((r)=>r.json())
        .then((result)=>{
            setThumbsUpPostCount(result)
        })
    }

    useEffect(()=>{
        selectThumbUpPost()
    },[])

    return (
        <div className='recommend' style={{cursor:'pointer'}} onClick={()=>{thumbsUpPost()}}>👍{thumbsUpPostCount}</div>
    );
}

