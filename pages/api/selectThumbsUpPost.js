import { getServerSession } from "next-auth";
import { connectDB } from "../../util/database";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method == 'POST') {

        try {
            let db = (await connectDB).db('forum')
            let result = await db.collection('thumbs_up_post').countDocuments({ parent: new ObjectId(req.body)})

            return res.status(200).json(result)
        } catch (error) {
            //   DB에러시 실행할코드~~
        }

    }
}