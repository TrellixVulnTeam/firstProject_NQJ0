"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredException = void 0;
const common_1 = require("@nestjs/common");
class TokenExpiredException extends common_1.HttpException {
    constructor() {
        super('Token has Expired', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.TokenExpiredException = TokenExpiredException;
//# sourceMappingURL=TokenExpiredException.js.map