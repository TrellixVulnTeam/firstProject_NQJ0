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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(dto) {
        await this.checkDuplicatedUser(dto.userID, dto.nickname);
        await this.usersRepository.createQueryBuilder()
            .insert()
            .into(users_entity_1.UsersEntity)
            .values(dto)
            .execute();
    }
    async updatePasswordUser(dto) {
        await this.usersRepository.createQueryBuilder()
            .update()
            .where(`userID = :keyID`, { keyID: dto.userID })
            .set({ password: dto.updatePassword })
            .execute();
    }
    async updateNicknameUser(dto) {
        await this.checkDuplicatedUser(null, dto.updateNickname);
        await this.usersRepository.createQueryBuilder()
            .update()
            .where(`userID = :keyID`, { keyID: dto.userID })
            .set({ nickname: dto.updateNickname })
            .execute();
    }
    async checkDuplicatedUser(userID, nickname) {
        const duplicated = await this.usersRepository.createQueryBuilder()
            .select()
            .where(`userID = :keyID`, { keyID: userID })
            .orWhere(`nickname = :keyNickname`, { keyNickname: nickname })
            .getOne();
        if (duplicated) {
            if (userID && duplicated.userID === userID) {
                throw new Error('중복된 ID입니다.');
            }
            else if (nickname && duplicated.nickname === nickname) {
                throw new Error('중복된 이름입니다.');
            }
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map