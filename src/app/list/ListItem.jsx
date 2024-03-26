'use client'

import DetailLink from "./DetailLink";

export default function ListItem(props) {
    console.log(props)  
    return (
        <div>
            {
                props.result.map((a, i) =>
                    <div className="list-item" key={i}>
                        <DetailLink id={a._id} title={a.title} />
                        <div className="item">
                            <p>{a.author}</p>
                            <span onClick={(e) => {
                                fetch('/api/delete', { method: 'POST', body: a._id }).then((r) => {
                                    if (r.status == 200) {
                                        e.target.parentElement.style.opacity = 0;
                                        setTimeout(() => {
                                            e.target.parentElement.style.display = 'none';
                                        }, 1000)
                                    } else if(r.status == 500) {
                                        alert('작성자만 삭제 가능')
                                    }
                                })
                            }
                            } style={{ cursor: 'pointer' }}>🗑</span>                           
                        </div>
                    </div>
                )
            }
        </div>
    );
}

