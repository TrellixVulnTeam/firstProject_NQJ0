import { CommentEntity } from "./comment.entity";
export declare class LikeCommentEntity {
    ID: number;
    commentID: number;
    comment: CommentEntity;
    userID: String;
}
