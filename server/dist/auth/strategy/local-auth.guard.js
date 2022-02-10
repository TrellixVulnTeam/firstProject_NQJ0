"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context, status) {
        if (err) {
            throw err;
        }
        else if (!user) {
            throw new common_1.UnauthorizedException('로그인 정보가 맞지 않습니다.');
        }
        return user;
    }
}
exports.LocalAuthGuard = LocalAuthGuard;
//# sourceMappingURL=local-auth.guard.js.map