import { connectDB } from "../../util/database";

export default async function handler(req, res) {
    let db = (await connectDB).db('forum')
    let findUser = await db.collection('user').find().toArray()
    
    if (req.method == 'POST') {
        if (req.body.id == '') {
            return res.status(500).json('아이디 입력하셈')
        }else if(req.body.password == ''){
            return res.status(500).json('비번치셈')
        }else if(findUser.map(e=>e.id).includes(req.body.id)){
            return res.status(500).json('이미 있는 아이디임')
        }
        try {
            let result = db.collection('user').insertOne(req.body)
            res.redirect(302, '/list')
        } catch (error) {
        //   DB에러시 실행할코드~~
        }

    }
}