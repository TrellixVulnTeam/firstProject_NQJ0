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
const books_entity_1 = require("../entities/books.entity");
const read_entity_1 = require("../entities/read.entity");
const typeorm_2 = require("typeorm");
let BooksService = class BooksService {
    constructor(booksRepository, readRepository) {
        this.booksRepository = booksRepository;
        this.readRepository = readRepository;
    }
    async getBooksList(dto) {
        const res = await this.booksRepository.createQueryBuilder('books')
            .select([`books.bookID AS bookID`, 'books.title AS title',
            'books.author AS author', 'COUNT(IF(read.like = 1, 1, null)) AS `like`',
            'COUNT(readID) AS `read`'])
            .leftJoin(`read`, `read`, `books.bookID = read.bookID`)
            .groupBy('books.bookID')
            .offset(dto.offset)
            .limit(dto.limit).getRawMany();
        return res;
    }
    async getBookInfoByID(id) {
        const res = await this.booksRepository.createQueryBuilder()
            .where('bookID = :keyBookID', { keyBookID: id })
            .getOne();
        return res;
    }
    async postBook(dto) {
        await this.checkDuplicatedBook(dto.title, dto.author);
        return (await this.booksRepository.createQueryBuilder()
            .insert()
            .into(books_entity_1.BooksEntity)
            .values(dto)
            .execute()).raw.affectedRows;
    }
    async checkDuplicatedBook(title, author) {
        const res = await this.booksRepository.createQueryBuilder()
            .select()
            .where(`title = :keyTitle`, { keyTitle: title })
            .andWhere(`author = :keyAuthor`, { keyAuthor: author })
            .getOne();
        if (res) {
            throw new Error(`이미 존재하는 책입니다. 책 번호 = ${res.bookID}`);
        }
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(books_entity_1.BooksEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(read_entity_1.ReadEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map