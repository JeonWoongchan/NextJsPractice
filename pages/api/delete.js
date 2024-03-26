import { ObjectId } from "mongodb";
import { connectDB } from "../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const filter = { _id: new ObjectId(req.body) }
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(500).json('작성자만 삭제 가능');
        }

        try {
            let db = (await connectDB).db('forum')
            let findPost = await db.collection('post').findOne(filter)

            if(session.user.email == findPost.author || session.user.role == 'admin') {
                let result1 = await db.collection('post').deleteOne(filter)
                let result2 = await db.collection('comment').deleteMany({parent : new ObjectId(req.body)}) // 해당 게시글의 댓글도 모두 삭제

                return res.status(200).json('삭제완료')
            } else {
                return res.status(500).json('작성자만 삭제 가능')
            }
        } catch (error) {
            //   DB에러시 실행할코드~~
        }

    }
}