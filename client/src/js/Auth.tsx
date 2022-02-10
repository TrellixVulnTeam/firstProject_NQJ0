import * as React from 'react';
import * as ReactDOM from 'react-dom';
import passwordEncryption from './module/passwordEncryption';
import axios from 'axios';
import jwtInterceptor from './module/jwtInterceptor';
import cookieParser from './module/cookieParser';
import "../scss/Auth.scss";

axios.defaults.validateStatus = status => status < 500;

interface Props {}

const NotLogined = ({  }: Props) => {
  const formID = "AuthForm";

  const submitAuth = e =>{
    e.preventDefault();
    const userID = document.forms[formID].elements["loginID"].value;
    const password = document.forms[formID].elements["loginPassword"].value;
    const encryptedPassword = passwordEncryption(password, userID);
    jwtInterceptor.post('/auth', {userID, password: encryptedPassword}).then(res => {
      if(res.status >= 400){
        alert(res.data.message);
        location.reload();
      } else{
        location.href= '/';
      }
    });
  }
  
  return <>
    <form method="post" name={formID}>
      <label>
        아이디: <input type="id" id='loginID' name='loginID'/>
      </label><br />
      <label>
        비밀번호: <input type="password" id='loginPassword' name='loginPassword'/>
      </label><br />
      <button onClick={e => submitAuth(e)}>로그인</button>
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
    <a href="">내 정보</a>
    <button onClick={e => deleteAuth(e)}>로그아웃</button>
  </>
}

(() => {
  if(!cookieParser?.accessJWT) ReactDOM.render(<NotLogined/>, document.querySelector("#auth"));
  else{
    jwtInterceptor.get('/auth').then(res => {
      if(!res.data.userID) ReactDOM.render(<NotLogined/>, document.querySelector("#auth"));
      else ReactDOM.render(<Logined/>, document.querySelector("#auth"));
    })
  }
})();
