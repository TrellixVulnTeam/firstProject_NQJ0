"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredError = void 0;
const common_1 = require("@nestjs/common");
class TokenExpiredError extends common_1.HttpException {
    constructor() {
        super('Token Required', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.TokenExpiredError = TokenExpiredError;
//# sourceMappingURL=TokenExpiredError.js.map