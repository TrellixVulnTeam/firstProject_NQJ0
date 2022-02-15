## 해결하지 못한 것들.
1. auth.module.ts의 secret Key를 configService에서 가져오는 방법.

## 해야할 것들.
1. 파이프 공부 후 Validation 재정비
2. tslint 설정하기.

## 해결한 것들.
1. JWT관리.
모든 권한이 필요한 요청은 JWTAccessGuard를 넣는다.
Role이 필요한 요청에는 RoleGuard또한 넣는다.
AccessGuard가 필요한 요청을 하면 1차적으로 AccesGuard를 검사하고 없거나 만료되었으면 RefreshGuard를 이용해서 RefreshToken을 검사하는 /auth/jwt로 쿼리에 현재 location과 method를 넣어서 리다이렉트 시킨다.
AccessToken이 있고 만료되지 않았으면 RolesGuard가 검사를 하고 요청의 권한이 충족되지 않았을 때, 403을 반환하고, 클라이언트의 jwtInterceptor는 403을 받으면 적절한 메시지를 출력한 후, 메인 페이지로 이동한다.
RefreshGuard에서는 RefreshToken검사를 하고 없거나 만료되었으면 AccessToken과 RefreshToken을 지우고 적절한 메시지를 포함해서 401을 반환하며, 클라이언트는 401을 받으면 jwtInterceptor를 이용해서 메시지와 함께 메인 화면으로 이동시킨다.
RefreshToken이 있고 만료가 되지 않았을때, 만약 메소드가 GET이라면 이전 url로 다시 리다이렉트하고, POST라면 202를 반환한다. jwtInterceptor는 202를 반환받으면 페이지를 리로딩하며 사용자에게 재요청을 부탁한다.