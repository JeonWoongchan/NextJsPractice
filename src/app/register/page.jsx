'use client'

import { useState } from "react"

export default function Register() {
    const [selected, setSelected] = useState('normal')

    return (
        <div>
            <form method="POST" action="/api/auth/signup">
                <input name="name" type="text" placeholder="이름" />
                <input name="email" type="text" placeholder="이메일" />
                <input name="password" type="password" placeholder="비번" />
                <select name="role" id="" onChange={(e)=>{setSelected(e.target.value)}}>
                    <option value="normal">일반</option>
                    <option value="admin">관리자</option>
                </select>
                {
                    selected === 'admin' ? <input name="" type="" placeholder="관리자 번호"/> : null
                }               
                <button type="submit">id/pw 가입요청</button>
            </form>
        </div>
    )
}