export declare enum Role {
    User = "user",
    Admin = "admin"
}
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
