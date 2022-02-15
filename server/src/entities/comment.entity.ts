import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LikeCommentEntity } from "./likecomment.entity";

@Entity({
    name: 'comment'
})
export class CommentEntity{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    userID: string;
    @Column()
    bookID: number;
    @Column("text")
    text: string;
    @CreateDateColumn({type: 'date'})
    regDate: string;
    @OneToMany(() => LikeCommentEntity, like => like.comment)
    like: LikeCommentEntity[]
}


export class CommentModel{
    ID: number;
    userID: string;
    regDate: string;
    text: string;
    likeCount: number;
    writeComment: boolean;
    likeComment: boolean;

    constructor(entity: CommentEntity, userID: String){
        return {
            ID: entity.ID,
            userID: entity.userID,
            regDate: entity.regDate,
            text: entity.text,
            likeCount : entity.like.length,
            writeComment: entity.userID === userID,
            likeComment: !entity.like.every((v) =>  v.userID !== userID),
        };
    }
}