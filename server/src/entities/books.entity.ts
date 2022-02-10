import { Column, Entity, Like, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'books'
})
export class BooksEntity{
    @PrimaryGeneratedColumn()
    bookID: number;
    @Column({
        length: 30
    })
    title: string;
    @Column("text")
    plot: string;
    @Column({
        length: 20
    })
    author: string;
}