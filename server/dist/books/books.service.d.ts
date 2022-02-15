import { BookEntity } from 'src/entities/book.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { LikeCommentEntity } from 'src/entities/likecomment.entity';
import { Repository } from 'typeorm';
import { BookInfoModel, GetBooksListDto, PostBookDto } from './dto/book.dto';
import { PostCommentDto } from './dto/comment.dto';
export declare class BooksService {
    private readonly bookRepository;
    private readonly commentRepository;
    private readonly likeCommentRepository;
    constructor(bookRepository: Repository<BookEntity>, commentRepository: Repository<CommentEntity>, likeCommentRepository: Repository<LikeCommentEntity>);
    getBooksList(dto: GetBooksListDto): Promise<BookEntity[]>;
    getBookInfoByID(bookID: number): Promise<BookInfoModel>;
    postBook(dto: PostBookDto): Promise<any>;
    checkDuplicatedBook(title: string, author: string): Promise<void>;
    getComments(userID: string, bookID: number): Promise<any[]>;
    postComment(dto: PostCommentDto): Promise<boolean>;
    deleteComment(commentID: number): Promise<void>;
    postCommentLike(commentID: number, userID: string): Promise<void>;
    deleteCommentLike(commentID: number, userID: string): Promise<void>;
}
