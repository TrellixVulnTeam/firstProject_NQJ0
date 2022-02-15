import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostCommentDto{
    @IsString()
    userID: string;
    @IsNumber()
    bookID: number;
    @IsNotEmpty()
    text: string;
}