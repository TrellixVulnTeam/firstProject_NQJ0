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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_refresh_guard_1 = require("./strategy/jwt-refresh.guard");
const local_auth_guard_1 = require("./strategy/local-auth.guard");
const auth_service_1 = require("./auth.service");
const jwt = require("jsonwebtoken");
const jwt_access_guard_1 = require("./strategy/jwt-access.guard");
const token_f_1 = require("./exceptions/token.f");
const JWTInterceptor_1 = require("../interceptors/JWTInterceptor");
let AuthController = class AuthController {
    constructor(authService, config) {
        this.authService = authService;
        this.config = config;
        this.handleRefreshToken = authService.handleRefreshToken();
    }
    async getUserID(req, res) {
        res.send(req.user);
    }
    async loginUser(req, res) {
        try {
            const refreshToken = await this.handleRefreshToken.issueToken(req.user);
            const accessToken = await this.authService.issueAccessToken(req.user);
            res.cookie(this.config.get("ACCESS_JWT"), accessToken, {
                sameSite: 'lax',
            }).cookie(this.config.get("REFRESH_JWT"), refreshToken, {
                path: '/auth/jwt',
                sameSite: 'lax',
            }).send();
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async logoutUser(req, res) {
        const user = jwt.decode(req.cookies.accessJWT);
        if (user)
            this.authService.handleRefreshToken().deleteToken(user);
        res.clearCookie(this.config.get("ACCESS_JWT"))
            .clearCookie(this.config.get("REFRESH_JWT"), { path: "/auth/jwt" }).send();
    }
    async issueAccessToken(req, res) {
        const accessToken = await this.authService.issueAccessToken(req.user);
        if (req.query.method === "GET") {
            res.cookie(this.config.get("ACCESS_JWT"), accessToken, {
                sameSite: 'lax'
            }).redirect(req.query.location);
        }
        else {
            res.cookie(this.config.get("ACCESS_JWT"), accessToken, {
                sameSite: 'lax'
            }).status(202).send();
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserID", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.UseFilters)(token_f_1.RefreshTokenExceptionFilter),
    (0, common_1.Get)('/jwt'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "issueAccessToken", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map