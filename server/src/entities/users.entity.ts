import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { BookEntity } from "./book.entity";

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
}
