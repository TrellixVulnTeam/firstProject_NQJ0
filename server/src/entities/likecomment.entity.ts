import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";

@Entity({
    name: 'likecomment'
})
export class LikeCommentEntity{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    commentID: number;
    @ManyToOne(() => CommentEntity)
    @JoinColumn({name: 'commentID'})
    comment: CommentEntity;
    @Column()
    userID: String;
}