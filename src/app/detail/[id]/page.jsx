import { ObjectId } from "mongodb";
import { connectDB } from "../../../../util/database";
import ModifyLink from "./ModifyLink";
import Comment from "./Comment";
import ThumbsUpPost from "./ThumbsUpPost";
import { notFound } from "next/navigation";
import './globals.css'


export default async function Detail(props) {
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    // 좋아요 누른 유저는 좋아요 추가 안되게, 좋아요 개수 표시(document개수 세기)

    if(result === null) {
        return notFound()//404페이지
    }

    return (
        <div className="detail">
            <h1>{result.title}</h1>
            <ModifyLink id={result._id.toString()} title={result.title}/>
            <p className="content">{result.content}</p>
            <ThumbsUpPost id={result._id.toString()}></ThumbsUpPost>
            <Comment id={result._id.toString()}/>
        </div>
    )
}