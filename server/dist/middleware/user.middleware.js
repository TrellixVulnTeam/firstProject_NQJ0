"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_decode_1 = require("jwt-decode");
let UserMiddleware = class UserMiddleware {
    use(req, res, next) {
        try {
            const decoded = (0, jwt_decode_1.default)(req.cookies.accessJWT);
            if (decoded) {
                req.user = { userID: decoded.userID, nickname: decoded.sub };
            }
            else {
                req.user = null;
            }
        }
        catch (e) {
            req.user = null;
        }
        finally {
            next();
        }
    }
};
UserMiddleware = __decorate([
    (0, common_1.Injectable)()
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=user.middleware.js.map