import axios from "axios";
import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import jwtInterceptor from "../module/jwtInterceptor";
import {BookComment, IComment} from './BookComment'

interface IBookInfo {
    title: String;
    author: String;
    plot: String;
}

const BookInfo = ({bookID}) => {
    const [bookInfo, setBookInfo] = useState<IBookInfo>(null);
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        jwtInterceptor.get<IBookInfo& {message: String}>(`/books/info/${bookID}`).then(res => {
            if(res.status >= 400){
                alert(res.data.message);
            }else{
                setBookInfo({...res.data});
            }
        });
        jwtInterceptor.get<IComment[] & {message: String}>(`/books/comments/${bookID}`).then(res => {
            if(res.status >= 400){
                alert(res.data.message)
            }else{
                setComments(res.data);
            }
        });
    }, [bookID])

    const WriteComment = e => {
        e.preventDefault();
        const text = (document.querySelector("#comment").querySelector("#write") as HTMLInputElement).value;
        if(text === ''){
            alert("댓글을 입력해 주세요.");
        } else{
            jwtInterceptor.post(`/books/comment/${bookID}`,{text}).then(res => {
                if(res.status >= 400){
                    alert(res.data);
                }
                console.log(22);
                location.reload();
            })
        }
    }

    return <>
        <div id="title">제목: {bookInfo?.title}</div>
        <div id="author">작가: {bookInfo?.author}</div>
        <div id="plot">줄거리: {bookInfo?.plot}</div>
        <div id="comment">
            <input type="text" id="write"
            placeholder="댓글 입력하기.."/>
            <button onClick={e => WriteComment(e)}>작성</button>
            <ol>
                {comments ? comments.map(comment => {
                    return <li><BookComment {...comment}/></li>
                }): null}
            </ol>
        </div>
    </>
}

const div = document.querySelector("#bookinfo");
ReactDOM.render(<BookInfo bookID = {div.getAttribute("bookID")}/>, document.querySelector("#bookinfo"));