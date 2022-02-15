"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesException = void 0;
const common_1 = require("@nestjs/common");
class RolesException extends common_1.HttpException {
    constructor(message = 'ss') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.RolesException = RolesException;
//# sourceMappingURL=roles.e.js.map