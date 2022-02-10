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
exports.AuthorsController = void 0;
const common_1 = require("@nestjs/common");
const authors_service_1 = require("./authors.service");
const fs = require("fs");
const path = require("path");
const config_1 = require("@nestjs/config");
const role_enum_1 = require("../enums/role.enum");
let AuthorsController = class AuthorsController {
    constructor(authorsService, configService) {
        this.authorsService = authorsService;
        this.configService = configService;
    }
    async getAuthors() {
        try {
            const author = await this.authorsService.getAuthors();
            return author;
        }
        catch (e) {
            throw new common_1.BadRequestException('잘못된 요청입니다.');
        }
    }
    async postAuthor(body) {
        try {
            await this.authorsService.postAuthor(body);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async getPage(params, res) {
        try {
            return fs.readFileSync(path.join(this.configService.get('ROOT_PATH'), `/html/authors/authors.${params.page}.html`)).toString('utf-8');
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
};
__decorate([
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "getAuthors", null);
__decorate([
    (0, role_enum_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "postAuthor", null);
__decorate([
    (0, common_1.Get)('/:page'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorsController.prototype, "getPage", null);
AuthorsController = __decorate([
    (0, common_1.Controller)('authors'),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService,
        config_1.ConfigService])
], AuthorsController);
exports.AuthorsController = AuthorsController;
//# sourceMappingURL=authors.controller.js.map