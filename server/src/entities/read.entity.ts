import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'read'
})
export class ReadEntity{
    @PrimaryGeneratedColumn()
    readID: number;
    @Column()
    userID: string;
    @Column()
    bookID: number;
    @Column()
    like: number;
    @Column()
    date: Date;
}