import { getServerSession } from "next-auth";
import { connectDB } from "../../util/database";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

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
            let findId = await db.collection('thumbs_up_post').find({user: session.user.id, parent: new ObjectId(req.body)}).toArray()
            if(findId.length == 0){
                let result = await db.collection('thumbs_up_post').insertOne(save)
                return res.status(200).json('완료')
            }else{
                return res.status(400).json('추천은 한번만 가능함')
            }

        } catch (error) {
            //   DB에러시 실행할코드~~
        }

    }
}