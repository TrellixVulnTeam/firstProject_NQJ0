import axios from 'axios';

function jwtInterceptor() {
    const instance = axios.create();
    instance.defaults.validateStatus = status => status < 500;

    instance.interceptors.response.use(async res => {
        //accessToken 만료
        if(res.status === 401){
            const refreshToken = await axios.get('/auth/jwt',{
                validateStatus: status => status < 500,
            });
            //다른 사용자 접속
            //refreshToken만료에 들어가는 delete auth도 포함해서 새로 접속한 사용자도 로그아웃 되도록 구현.
            if(refreshToken.status == 409){
                alert(refreshToken.data.message);
            }
            //refreshToken 만료 및 기타 오류
            if(refreshToken.status >= 400){
                await axios.delete('/auth');
                return refreshToken;
            } 
            //정상적으로 refreshToken 발급
            else{
                const data = await axios(res.config);
                return data;
            }
        }
        //accessToken 만료가 아닌 다른 오류
        else if(res.status >= 400){
            await axios.delete('/auth');
            alert(res.data.message);
            location.href = '/'
        } 
        //정상적인 호출
        else{
            const data = await axios(res.config);
            return data;
        }
    });
    return instance;
}

export default jwtInterceptor();