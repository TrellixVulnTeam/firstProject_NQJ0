"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JwtRefreshGuard extends (0, passport_1.AuthGuard)('refreshJWT') {
    constructor() {
        super();
    }
    canActivate(context) {
        return super.canActivate(context);
    }
}
exports.JwtRefreshGuard = JwtRefreshGuard;
//# sourceMappingURL=jwt-refresh.guard.js.map