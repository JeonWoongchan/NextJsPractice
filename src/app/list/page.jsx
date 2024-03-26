import { connectDB } from "../../../util/database"
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic' // 다이나믹 랜더링 설정

export default async function List() {
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').find().toArray()
    result = result.map(item => ({ ...item, _id: item._id.toString() }));
    // let result = await fetch('/api/어쩌구', { cache: 'force-cache' }) 이런식으로 캐싱 가능
    // fetch('/URL', { next: { revalidate: 60 } })  이런식으로 60초 동안만 캐싱 가능
    // fetch('/URL', { cache: 'no-store' })  캐싱 안쓰겠다는 거임
    console.log(result)
    return (
        <div className="list-bg">
            <ListItem result={result}/>
        </div>
    )
}