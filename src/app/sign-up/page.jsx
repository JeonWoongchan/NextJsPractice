import React from 'react';

export default function page() {
    return (
        <div>
            <h4>회원가입</h4>
            <form action='/api/sign-up' method="POST">
                <input type="text" name="id"/>
                <input type="password" name="password"/>
                <button type="submit">버튼</button>
            </form>
        </div>
        
    ); 
}

