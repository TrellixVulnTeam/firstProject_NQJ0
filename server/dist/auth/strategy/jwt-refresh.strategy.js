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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../auth.service");
const token_e_1 = require("../exceptions/token.e");
const extractFromCookie = req => {
    let refreshJWT = null;
    if (req === null || req === void 0 ? void 0 : req.cookies) {
        refreshJWT = req.cookies['refreshJWT'];
    }
    return refreshJWT;
};
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refreshJWT') {
    constructor(configService, authService) {
        super({
            jwtFromRequest: extractFromCookie,
            ignoreExpiration: true,
            secretOrKey: configService.get('SECRET_KEY'),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(req, payload) {
        var _a;
        const user = { userID: payload.userID, nickname: payload.sub };
        if (!(await this.authService.handleRefreshToken().compareToken(user, (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.refreshJWT))) {
            throw new common_1.ConflictException('다른 사용자가 로그인하였습니다.');
        }
        else {
            if (payload.exp * 1000 < Date.now()) {
                throw new token_e_1.TokenException();
            }
            return user;
        }
    }
};
JwtRefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], JwtRefreshStrategy);
exports.JwtRefreshStrategy = JwtRefreshStrategy;
//# sourceMappingURL=jwt-refresh.strategy.js.map