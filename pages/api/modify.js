import { ObjectId } from "mongodb";
import { connectDB } from "../../util/database";

export default async function handler(req, res) {
    const filter = { _id: new ObjectId(req.body._id) } 

    if (req.method == 'POST') {
        if (req.body.title == '') {
            return res.status(500).json('제목써라')
        }
        try {
            let db = (await connectDB).db('forum')
            let result = await db.collection('post').updateOne(filter, {$set : {title: req.body.title, content:req.body.content}})
            await res.redirect(302, '/list')
        } catch (error) {
        //   DB에러시 실행할코드~~
        }

    }
}