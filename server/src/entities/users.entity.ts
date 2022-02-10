import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { BooksEntity } from "./books.entity";

@Entity({
    name: 'users'
})
export class UsersEntity {
    @PrimaryColumn({
        length: 20,
    })
    userID: string;
    @Column({
        length: 50,
    })
    password: string;
    @Column({
        length: 20,
    })
    nickname: string;
    @Column({
        length: 50,
    })
    refreshJWT: string;
    @Column()
    @OneToOne(type => BooksEntity, favoriteBookID => favoriteBookID.bookID)
    favoriteBookID: number;
    @Column({type: 'text'})
    statusMessage: string;
}
