"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenException = exports.AccessTokenException = void 0;
const common_1 = require("@nestjs/common");
class AccessTokenException extends common_1.HttpException {
    constructor(message = 'Access Token has Expired') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.AccessTokenException = AccessTokenException;
class RefreshTokenException extends common_1.HttpException {
    constructor(message = 'Refresh Token has Expired') {
        super({ message }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.RefreshTokenException = RefreshTokenException;
//# sourceMappingURL=token.e.js.map