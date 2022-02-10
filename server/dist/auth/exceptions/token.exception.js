"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenException = void 0;
const common_1 = require("@nestjs/common");
class TokenException extends common_1.HttpException {
    constructor() {
        super('Token has Expired', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.TokenException = TokenException;
//# sourceMappingURL=token.exception.js.map