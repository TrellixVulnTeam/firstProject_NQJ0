import { LikeCommentEntity } from "./likecomment.entity";
export declare class CommentEntity {
    ID: number;
    userID: string;
    bookID: number;
    text: string;
    regDate: string;
    like: LikeCommentEntity[];
}
export declare class CommentModel {
    ID: number;
    userID: string;
    regDate: string;
    text: string;
    likeCount: number;
    writeComment: boolean;
    likeComment: boolean;
    constructor(entity: CommentEntity, userID: String);
}
