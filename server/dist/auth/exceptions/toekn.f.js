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
exports.RefreshTokenExceptionFilter = exports.AccessTokenExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const token_e_1 = require("./token.e");
let AccessTokenExceptionFilter = class AccessTokenExceptionFilter {
    catch(exception, host) {
        const req = host.switchToHttp().getRequest();
        const res = host.switchToHttp().getResponse();
        res.redirect(`/auth/jwt?location=${req.url}`);
    }
};
AccessTokenExceptionFilter = __decorate([
    (0, common_1.Catch)(token_e_1.AccessTokenException)
], AccessTokenExceptionFilter);
exports.AccessTokenExceptionFilter = AccessTokenExceptionFilter;
let RefreshTokenExceptionFilter = class RefreshTokenExceptionFilter {
    constructor(config) {
        this.config = config;
    }
    catch(exception, host) {
        const res = host.switchToHttp().getResponse();
        res.clearCookie(this.config.get("ACCESS_JWT"))
            .clearCookie(this.config.get("REFRESH_JWT"), { path: "/auth/jwt" })
            .status(exception.getStatus()).send({ message: exception.message });
    }
};
RefreshTokenExceptionFilter = __decorate([
    (0, common_1.Catch)(token_e_1.RefreshTokenException),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RefreshTokenExceptionFilter);
exports.RefreshTokenExceptionFilter = RefreshTokenExceptionFilter;
//# sourceMappingURL=toekn.f.js.map