'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function PageThema(props) {
    const router = useRouter()

    useEffect(()=>{
        // const cookie = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0] // 쿠키 있는지 확인

        if(props.nowPageThema == undefined) {
            document.cookie = 'pageThema=light; max-age=' + (3600 * 24 * 400)
            router.refresh()
        }
    },[])

    const pageThemaHandler = ()=>{
        if(props.nowPageThema.value == 'light') {
            document.cookie = 'pageThema=dark; max-age=' + (3600 * 24 * 400)
        }else if(props.nowPageThema.value == 'dark') {
            document.cookie = 'pageThema=light; max-age=' + (3600 * 24 * 400)
        }
        router.refresh()
    }

    return (
        <button onClick={()=>{pageThemaHandler()}}>{props.nowPageThema != undefined && props.nowPageThema.value == 'light' ? '🌙' : '☀'}</button>
    );
}

