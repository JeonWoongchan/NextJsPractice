import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {

    // request.cookies.get('쿠키이름')  //출력
    // request.cookies.has('pageThema')  //존재확인
    // request.cookies.delete('쿠키이름')  //삭제

    if (request.nextUrl.pathname.startsWith('/register')) {
        const response = NextResponse.next()
        if(!request.cookies.has('visited')) {
            response.cookies.set({
                name: 'visited',
                value: 'true',
                maxAge: 3600,
                httpOnly: true
            })
            return response // 쿠키생성
        }
        return NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith('/write')) {
        const session = await getToken({ req: request }) // 미들웨어에서는 getToken 가능
        console.log('세션', session)
        if (session == null) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
    }

    if (request.nextUrl.pathname == '/list') {
        console.log(new Date().toLocaleString()) // 시간정보
        console.log(request.headers.get('sec-ch-ua-platform')) //os정보
        return NextResponse.next()
    }
} 