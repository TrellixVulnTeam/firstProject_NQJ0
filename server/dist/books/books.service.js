"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("../entities/book.entity");
const comment_entity_1 = require("../entities/comment.entity");
const likecomment_entity_1 = require("../entities/likecomment.entity");
const typeorm_2 = require("typeorm");
let BooksService = class BooksService {
    constructor(bookRepository, commentRepository, likeCommentRepository) {
        this.bookRepository = bookRepository;
        this.commentRepository = commentRepository;
        this.likeCommentRepository = likeCommentRepository;
    }
    async getBooksList(dto) {
        const res = await this.bookRepository.createQueryBuilder()
            .select()
            .offset(dto.offset)
            .limit(dto.limit).getMany();
        return res;
    }
    async getBookInfoByID(bookID) {
        const res = await this.bookRepository.createQueryBuilder()
            .where('ID = :keyBookID', { keyBookID: bookID })
            .getOne();
        return res;
    }
    async postBook(dto) {
        await this.checkDuplicatedBook(dto.title, dto.author);
        return (await this.bookRepository.createQueryBuilder()
            .insert()
            .into(book_entity_1.BookEntity)
            .values(dto)
            .execute()).raw.affectedRows;
    }
    async checkDuplicatedBook(title, author) {
        const res = await this.bookRepository.createQueryBuilder()
            .select()
            .where(`title = :keyTitle`, { keyTitle: title })
            .andWhere(`author = :keyAuthor`, { keyAuthor: author })
            .getOne();
        if (res) {
            throw new Error(`이미 존재하는 책입니다. 책 번호 = ${res.ID}`);
        }
    }
    async getComments(userID, bookID) {
        const entity = await this.commentRepository.createQueryBuilder("comment")
            .where("comment.bookID = :keyBookID", { keyBookID: bookID })
            .leftJoinAndSelect("comment.like", "like")
            .getMany();
        const res = [];
        entity.forEach(comment => {
            const model = new comment_entity_1.CommentModel(comment, userID);
            res.push(model);
        });
        return res;
    }
    async postComment(dto) {
        const isSuccessed = (await this.commentRepository.createQueryBuilder()
            .insert()
            .into(comment_entity_1.CommentEntity)
            .values(dto)
            .execute()).raw.affectedRows;
        console.log(`in postComment = ${isSuccessed}`);
        if (isSuccessed) {
            return true;
        }
        else {
            return false;
        }
    }
    async deleteComment(commentID) {
        const isSuccessed = (await this.commentRepository.createQueryBuilder()
            .delete()
            .from(comment_entity_1.CommentEntity)
            .where(`ID= ${commentID}`)
            .execute());
    }
    async postCommentLike(commentID, userID) {
        await this.likeCommentRepository.createQueryBuilder()
            .insert()
            .values([
            { commentID, userID }
        ]).execute();
    }
    async deleteCommentLike(commentID, userID) {
        await this.likeCommentRepository.createQueryBuilder()
            .delete()
            .where(`commentID = :keyCommentID`, { keyCommentID: commentID })
            .andWhere(`userID = :keyUserID`, { keyUserID: userID })
            .execute();
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.BookEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(likecomment_entity_1.LikeCommentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map