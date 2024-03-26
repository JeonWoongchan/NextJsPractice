import { getServerSession } from "next-auth";
import { connectDB } from "../../util/database";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)

    if(session) {
        req.body.author = session.user.email
    }
    console.log(req.body)
    if (req.method == 'POST' && session) {
        if (req.body.title == '') {
            return res.status(500).json('제목써라')
        }
        try {
            let db = (await connectDB).db('forum')
            let result = await db.collection('post').insertOne(req.body)
            await res.status(200).redirect(302, '/list');
        } catch (error) {
        //   DB에러시 실행할코드~~
        }
    }
}