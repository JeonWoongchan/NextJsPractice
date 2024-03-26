'use client'
import React, { useEffect, useState } from 'react';

export default function Comment(props) {
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])

    const newList = () => {
        fetch('/api/comment/selectComment', { method: 'POST', body: props.id })
            .then(r => r.json())
            .then((result) => {
                setCommentList(result)
            })
    }

    useEffect(() => { // 댓글 목록 가져오기
        newList()
    }, [])

    const submitComment = () => {
        fetch('/api/comment/newComment', { method: 'POST', body: JSON.stringify({ comment: comment, id: props.id }) })
            .then(() => {
                setComment('')
                newList()
            })
    }

    const thumbsUpComment = (commentId) => {
        fetch('/api/comment/thumbs-up', { method: 'POST', body: commentId })
            .then(() => {
                newList()
            })
    }

    return (
        <div className='comment'>
            {
                commentList.map((a, i) => {
                    return (
                        <div className="comment-item" key={i}>{a.content}
                            {/* <span style={{ cursor: 'pointer' }} onClick={() => { thumbsUpComment(a._id) }}>👍</span> */}
                        </div>
                    )
                })
            }
            <div className="new-comment">
                <input type="text" placeholder='로그인 후 작성 가능' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                <button onClick={() => { submitComment() }}>작성</button>
            </div>
        </div>
    );
}

