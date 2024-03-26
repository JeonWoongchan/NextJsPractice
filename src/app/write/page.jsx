import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export default async function Write() {
    const session = await getServerSession(authOptions) // 로그인한 유저 정보 출력

    if (!session) {
        return (
            <div>로그인하셈</div>
        )
    } else {
        return (
            <div>
                <h4>글 작성</h4>
                <form action='/api/write' method="POST">
                    <input type="text" name="title" />
                    <input type="text" name="content" />
                    <button type="submit">작성</button>
                </form>
            </div>
        );
    }

}

