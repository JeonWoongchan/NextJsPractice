import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/database";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let db = (await connectDB).db('forum')
        let result = await db.collection('comment').find({parent : new ObjectId(req.body)}).toArray()

        return res.status(200).json(result)
    } else {
        return res.status(500)
    }
}