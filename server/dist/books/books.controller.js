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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const jwt_access_guard_1 = require("../auth/strategy/jwt-access.guard");
const roles_decorator_1 = require("../auth/strategy/roles.decorator");
const roles_guard_1 = require("../auth/strategy/roles.guard");
const JWTInterceptor_1 = require("../interceptors/JWTInterceptor");
const books_service_1 = require("./books.service");
const book_dto_1 = require("./dto/book.dto");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async getBooksList(offset, limit) {
        try {
            const dto = { offset, limit };
            const res = await this.booksService.getBooksList(dto);
            return res;
        }
        catch (e) {
            throw new common_1.BadRequestException('잘못된 요청입니다.');
        }
    }
    async postBook(body) {
        try {
            if (!(await this.booksService.postBook(body))) {
                throw new Error('Error in postBook');
            }
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async getBookInfo(bookID, req, res) {
        const model = await this.booksService.getBookInfoByID(bookID);
        if (!model)
            throw new common_1.NotFoundException();
        res.send(model);
    }
    async getBookInfoPage(bookID) {
        return { bookID };
    }
    async getBookComment(bookID, req, res) {
        var _a;
        const comments = await this.booksService.getComments((_a = req.user) === null || _a === void 0 ? void 0 : _a.userID, bookID);
        res.send(comments);
    }
    async postBookComment(bookID, req, res) {
        const dto = {
            bookID,
            userID: req.user.userID,
            text: req.body.text
        };
        try {
            const isSuccessed = await this.booksService.postComment(dto);
            if (!isSuccessed) {
                throw new common_1.HttpException("요청이 잘못되었습니다.", common_1.HttpStatus.BAD_REQUEST);
            }
            res.send();
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteBookComment(commentID, req, res) {
        try {
            const isSuccessed = await this.booksService.deleteComment(commentID);
            res.send();
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async postCommentLike(commentID, req, res) {
        await this.booksService.postCommentLike(commentID, req.user.userID);
        res.send();
    }
    async deleteCommentLike(commentID, req, res) {
        await this.booksService.deleteCommentLike(commentID, req.user.userID);
        res.send();
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('offset', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBooksList", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.PostBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "postBook", null);
__decorate([
    (0, common_1.Get)('/info/:bookID'),
    __param(0, (0, common_1.Param)('bookID', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBookInfo", null);
__decorate([
    (0, common_1.Get)('/pages/info/:bookID'),
    (0, common_1.Render)('bookinfo.hbs'),
    __param(0, (0, common_1.Param)('bookID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBookInfoPage", null);
__decorate([
    (0, common_1.Get)('/comments/:bookID'),
    (0, common_1.UseInterceptors)(JWTInterceptor_1.JWTInterceptor),
    __param(0, (0, common_1.Param)('bookID')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBookComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/comment/:bookID'),
    __param(0, (0, common_1.Param)('bookID')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "postBookComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/comment/:commentID'),
    __param(0, (0, common_1.Param)('commentID')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBookComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('/comments/like/:commentID'),
    __param(0, (0, common_1.Param)('commentID')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "postCommentLike", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/comments/like/:commentID'),
    __param(0, (0, common_1.Param)('commentID')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteCommentLike", null);
BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map