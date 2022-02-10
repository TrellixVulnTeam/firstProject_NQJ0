import { Blob } from "buffer";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"


@Entity({
    name: 'authors',
})
export class AuthorsEntity{
    @PrimaryColumn()
    author: string;
    @Column({
        type: "mediumblob"
    })
    photo: Blob;
    @Column({
        type: "text",
    })
    info: string;
}
