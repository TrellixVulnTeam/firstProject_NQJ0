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
exports.CommentModel = exports.CommentEntity = void 0;
const typeorm_1 = require("typeorm");
const likecomment_entity_1 = require("./likecomment.entity");
let CommentEntity = class CommentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentEntity.prototype, "userID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "bookID", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], CommentEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date' }),
    __metadata("design:type", String)
], CommentEntity.prototype, "regDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likecomment_entity_1.LikeCommentEntity, like => like.comment),
    __metadata("design:type", Array)
], CommentEntity.prototype, "like", void 0);
CommentEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'comment'
    })
], CommentEntity);
exports.CommentEntity = CommentEntity;
class CommentModel {
    constructor(entity, userID) {
        return {
            ID: entity.ID,
            userID: entity.userID,
            regDate: entity.regDate,
            text: entity.text,
            likeCount: entity.like.length,
            writeComment: entity.userID === userID,
            likeComment: !entity.like.every((v) => v.userID !== userID),
        };
    }
}
exports.CommentModel = CommentModel;
//# sourceMappingURL=comment.entity.js.map