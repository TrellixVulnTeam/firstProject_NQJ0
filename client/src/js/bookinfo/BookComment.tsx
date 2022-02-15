import React, { useEffect, useState } from "react"
import jwtInterceptor from "../module/jwtInterceptor";

export interface IComment{
    ID: number;
    userID: string;
    regDate: Date;
    text: string;
    likeCount: number;
    writeComment: boolean;
    likeComment: boolean;
}

export const BookComment = (prop: IComment) =>{
    const [comment, setComment] = useState<IComment>({...prop});
    const LikeComment = e => {
        if(comment.writeComment){
            alert("본인이 작성한 댓글에는 좋아요를 누를 수 없습니다.");
        } else{
            if(comment.likeComment){
                jwtInterceptor.delete(`/books/comments/like/${prop.ID}`).then(res => {
                    setComment({
                            ...comment,
                            likeCount: comment.likeCount-1,
                            likeComment: !comment.likeComment
                    });
                })
            } else{
                jwtInterceptor.post(`/books/comments/like/${prop.ID}`).then(res => {
                    setComment({
                            ...comment,
                            likeCount: comment.likeCount+1,
                            likeComment: !comment.likeComment
                    });
                });
            }
        }
    }

    const DeleteComment = e => {
        if(!comment.writeComment){
            alert("본인이 작성한 댓글만 지울 수 있습니다.");
        } else{
            jwtInterceptor.delete(`/books/comment/${comment.ID}`).then(res => {
                location.reload();
            });
        }
    }

    return <>
    {
        comment ?
        <div className="comment">
            <div>작성자 이름: {comment.userID}</div>
            <div>댓글 작성일: {comment.regDate}</div>
            <div>내용: {comment.text}</div>
            <button onClick={e => LikeComment(e)}>
                좋아요: {comment.likeCount}
            </button>
            {
                comment.writeComment ?
                <button onClick={e => DeleteComment(e)} >
                    지우기
                </button> : null
            }
        </div>
        : null
    }
    </>
}