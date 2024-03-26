
import bcrypt from "bcrypt";
import { connectDB } from "../../../util/database";

export default async function handler(req, res) {
    let db = (await connectDB).db('forum');
    let findUser = await db.collection('user').find().toArray()

    if (req.method === "POST") {
        if (req.body.name == '') {
            return res.status(501).json('이름 없음?')
        }else if (req.body.email == '') {
            return res.status(502).json('아이디 입력하셈')
        }else if(req.body.password == ''){
            return res.status(503).json('비번치셈')
        }else if(findUser.map(e=>e.email).includes(req.body.email)){
            return res.status(504).json('이미 있는 아이디임')
        }else{
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;
    
            await db.collection('user_cred').insertOne(req.body);
            res.status(200).json('성공');
        }
        
    }
}; 