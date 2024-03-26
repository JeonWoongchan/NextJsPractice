import { connectDB } from "../../util/database"

export default async function handler(request, res) {

    let db = (await connectDB).db('forum')
    let result = await db.collection('post').find().toArray()

    await res.status(200).json(result)
}