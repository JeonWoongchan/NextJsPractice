'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react';

export default function SignInButton() {

    useEffect(()=>{
        if(typeof window != 'undefined') {
            localStorage.setItem('pageMode', 'dark')
        }
    },[])

    return (
        <button onClick={()=>{ signIn() }}>로그인</button>
    );
}

