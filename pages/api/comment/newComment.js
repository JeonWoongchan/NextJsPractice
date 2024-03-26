import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { connectDB } from "../../../util/database";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(500).json('댓글 쓰려면 로그임 하셈');
        }

        try {
            req.body = JSON.parse(req.body)
            const save = {
                content: req.body.comment,
                parent: new ObjectId(req.body.id),
                author: session.user.email,
            }
            let db = (await connectDB).db('forum')
            let result = await db.collection('comment').insertOne(save)

            return res.status(200).json('작성완료')
        } catch (error) {
            //   DB에러시 실행할코드~~
        }

    }
}