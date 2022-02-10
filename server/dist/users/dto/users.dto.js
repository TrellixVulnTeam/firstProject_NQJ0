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
exports.UpdateNicknameUserDto = exports.UpdatePasswordUserDto = exports.UpdateUserDto = exports.CreateUserDto = exports.LoginUserDto = void 0;
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../decorators/match.decorator");
const typeorm_1 = require("typeorm");
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
let CreateUserDto = class CreateUserDto {
};
__decorate([
    (0, class_validator_1.MinLength)(5, {
        message: 'ID는 5글자 이상이어야 합니다.'
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'ID는 20글자 이하여야 합니다.'
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.MinLength)(2, {
        message: '이름은 2글자 이상이어야 합니다.'
    }),
    (0, class_validator_1.MaxLength)(10, {
        message: '이름은 10글자 이하여야 합니다.'
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickname", void 0);
CreateUserDto = __decorate([
    (0, typeorm_1.Unique)(['userID'])
], CreateUserDto);
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "userID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdatePasswordUserDto extends UpdateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordUserDto.prototype, "updatePassword", void 0);
__decorate([
    (0, match_decorator_1.Match)('updatePassword', {
        message: '두 비밀번호의 값이 일치하지 않습니다.'
    }),
    __metadata("design:type", String)
], UpdatePasswordUserDto.prototype, "verifyPassword", void 0);
exports.UpdatePasswordUserDto = UpdatePasswordUserDto;
class UpdateNicknameUserDto extends UpdateUserDto {
}
__decorate([
    (0, class_validator_1.MinLength)(2, {
        message: '이름은 2글자 이상이어야 합니다.'
    }),
    (0, class_validator_1.MaxLength)(10, {
        message: '이름은 10글자 이하여야 합니다.'
    }),
    __metadata("design:type", String)
], UpdateNicknameUserDto.prototype, "updateNickname", void 0);
exports.UpdateNicknameUserDto = UpdateNicknameUserDto;
//# sourceMappingURL=users.dto.js.map