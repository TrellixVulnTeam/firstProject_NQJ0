import * as React from 'react';
import * as ReactDOM from 'react-dom';
import passwordEncryption from '../modules/passwordEncryption';
import axios from 'axios';
import cookieParser from '../modules/cookieParser';
import "./scss/auth.scss";
import jwtInterceptor from '../modules/jwtInterceptor';

axios.defaults.validateStatus = status => status < 500;

interface Props {}

const NotLogined = ({  }: Props) => {
  const LoginFormName = "LoginForm";
  const SignupFormName = "SignupForm";

  const submitLogin = e =>{
    e.preventDefault();
    const userID = document.forms[LoginFormName].elements["loginID"].value;
    const password = document.forms[LoginFormName].elements["loginPassword"].value;
    const encryptedPassword = passwordEncryption(password, userID);
    axios.post('/auth', {userID, password: encryptedPassword}).then(res => {
      if(res.status >= 400){
        alert(res.data.message);
        location.reload();
      } else{
        location.href= '/';
      }
    });
  }

    const submitSignup = e => {
      e.preventDefault();
      const userID = document.forms[SignupFormName].elements["signupID"].value;
      const password = document.forms[SignupFormName].elements["signupPassword"].value;
      const nickname = document.forms[SignupFormName].elements["signupNickname"].value;
      const encryptedPassword = passwordEncryption(password, userID);
      axios.post('/users',{userID, password: encryptedPassword, nickname}).then(res => {
        alert(res.data.message);
        location.reload();
      });
    }
  
  return <>
    <form method="post" name={LoginFormName}>
      <label>
        아이디: <input type="id" id='loginID' name='loginID'/>
      </label><br />
      <label>
        비밀번호: <input type="password" id='loginPassword' name='loginPassword'/>
      </label><br />
      <button onClick={e => submitLogin(e)}>로그인</button>
    </form>
    <form method="post" name={SignupFormName}>
      <label>
        아이디: <input type="id" id='signupID' name='signupID'/>
      </label><br />
      <label>
        비밀번호: <input type="password" id='signupPassword' name='signupPassword'/>
      </label><br />
      <label>
        닉네임: <input type="text" id='signupNickname' name='signupNickname'/>
      </label><br />
      <button onClick={e => submitSignup(e)}>회원가입</button>
    </form>
  </>
};

const Logined = () => {
  const deleteAuth = e => {
    e.preventDefault();
    axios.delete('/auth').then(res => {
      if(res.status >= 400){
        alert(res.data.message);
        location.href = '/';
      } else{
        location.href = '/';
      }
    });
  }

  return <>
    <button onClick={e => location.href = '/'}>내 정보</button>
    <button onClick={e => deleteAuth(e)}>로그아웃</button>
  </>
}

if(!cookieParser?.accessJWT) ReactDOM.render(<NotLogined/>, document.querySelector("#auth"));
else{
  jwtInterceptor.get('/auth').then(res => {
    if(!res.data.userID) ReactDOM.render(<NotLogined/>, document.querySelector("#auth"));
    else ReactDOM.render(<Logined/>, document.querySelector("#auth"));
  })
}
