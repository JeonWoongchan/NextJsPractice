import React from 'react';
import { connectDB } from '../../../../util/database';
import { ObjectId } from 'mongodb';

export default async function Modify(props) {
    let db = (await connectDB).db('forum')
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    console.log(result)
    return (
        <div>
            <h4>글 작성</h4>
            <form action='/api/modify' method="POST">
                <input type="hidden" name="_id" value={props.params.id} />
                <input type="text" name="title" defaultValue={result.title}/>
                <input type="text" name="content" defaultValue={result.content}/>
                <button type="submit">버튼</button>
            </form>
        </div>
    );
}

