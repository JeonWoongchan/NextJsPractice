import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { connectDB } from "../../../util/database";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(500).json('로그인부터 하셈');
        }

        try {
            const save = {
                user: session.user.id,
                parent: new ObjectId(req.body),
            }
            let db = (await connectDB).db('forum')
            let result = await db.collection('thumbs_up_comment').insertOne(save)

            return res.status(200).json('완료')
        } catch (error) {
            //   DB에러시 실행할코드~~
        }

    }
}