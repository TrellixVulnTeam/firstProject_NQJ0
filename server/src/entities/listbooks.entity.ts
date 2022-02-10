import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'listbooks',
})
export class ListBooksEntity{
    @PrimaryGeneratedColumn()
    listBooksID: number;
    @Column()
    bookID: number;
    @Column()
    like: boolean;
    @Column({
        length: 10,
    })
    publisher: string;
    @Column({
        type: "blob"
    })
    cover: string;
    @Column({
        length: 10,
    })
    translator: string;
}
