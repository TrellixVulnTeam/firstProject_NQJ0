"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path = require("path");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const token_f_1 = require("./auth/exceptions/token.f");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new token_f_1.AccessTokenExceptionFilter());
    app.useStaticAssets(path.join(__dirname, '..', '..', 'client', 'public'));
    app.setBaseViewsDir(path.join(__dirname, '..', '..', 'client', 'public', 'views'));
    app.setViewEngine("hbs");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map