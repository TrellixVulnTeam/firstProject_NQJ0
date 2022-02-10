import { Blob } from "buffer";
import { IsNumber, IsString, Max } from "class-validator";

export class PostBookDto {
    @IsString()
    title: string;
    @IsString()
    plot: string;
    @IsString()
    author: string;
}

export class GetBooksListDto {
    @IsNumber()
    offset: number;
    @Max(100,{
        message: "Limit 값이 너무 커요ㅠㅠ"
    })
    limit: number;
}

export interface BookInfoModel{
    title: String;
    author: String;
    plot: String;
}
