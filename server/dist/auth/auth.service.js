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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const crypto_1 = require("crypto");
const users_entity_1 = require("../entities/users.entity");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, config) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.config = config;
    }
    async validateUser(user) {
        const ret = await this.usersRepository.createQueryBuilder()
            .select(`userID`)
            .addSelect(`nickname`)
            .where(`userID = :keyID`, { keyID: user.userID })
            .andWhere(`password = :keyPassword`, { keyPassword: user.password })
            .getRawOne();
        return ret;
    }
    handleRefreshToken() {
        const issueToken = async (user) => {
            const payload = { userID: user.userID, sub: user.nickname };
            const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get("REFRESH_EXPIRE") });
            (0, crypto_1.pbkdf2)(refreshToken, user.userID, 100, 64, 'sha512', async (err, key) => {
                if (err) {
                    throw err;
                }
                await this.usersRepository.createQueryBuilder()
                    .update()
                    .where(`userID = :keyID`, { keyID: user.userID })
                    .set({ [this.config.get("REFRESH_JWT")]: key.toString('base64') })
                    .execute();
            });
            return refreshToken;
        };
        const deleteToken = async (user) => {
            await this.usersRepository.createQueryBuilder()
                .update()
                .where(`userID= :keyID`, { keyID: user.userID })
                .set({ [this.config.get("REFRESH_JWT")]: null })
                .execute();
        };
        const compareToken = async (user, token) => {
            const query = await this.usersRepository.createQueryBuilder()
                .select(this.config.get("REFRESH_JWT"))
                .where(`userID = :keyID`, { keyID: user.userID })
                .getRawOne();
            const refreshToken = query[this.config.get("REFRESH_JWT")];
            if (token === null) {
                if (refreshToken === null)
                    return true;
                else
                    return false;
            }
            else {
                const encryptedToken = (0, crypto_1.pbkdf2Sync)(token, user.userID, 100, 64, 'sha512');
                if (encryptedToken.toString('base64') === refreshToken) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        return { issueToken, deleteToken, compareToken };
    }
    async issueAccessToken(user) {
        const payload = { userID: user.userID, sub: user.nickname };
        return this.jwtService.sign(payload, { expiresIn: this.config.get("ACCESS_EXPIRE") });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map