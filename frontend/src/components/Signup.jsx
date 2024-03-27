import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword1] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    // function Send() {
    //     console.log(email);
    //     console.log(password);
    //     console.log(name);
    //     console.log(nickname);
    //     console.log(phone);
    //     axios (
    //         {
    //         url: '/api/AxiosTest.do',
    //         method: 'post',
    //         data: {
    //             email,password,name,nickname,phone
    //         }
    //         baseURL: 'http://localhotst:8080'
    //     }
    //     ).then(function (resopnse) {
    //         console.log(reponse.data);
    //     });

    // }

    function emailHandler(event){
        setEmail(event.target.value);
    }
    function nameHandler(event){
        setName(event.target.value);
    }
    function passwordHandler(event){
        setPassword(event.target.value);
    }
    function nicknameHandler(event){
        setNickname(event.target.value);
    }
    function phoneHandler(event){
        setPhone(event.target.value);
    }
    function signUpHandler(event){
        event.preventDefault();
        navigate("/signupok", { state : { email, name, password, nickname, phone}});
    }
    return(
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">이메일주소</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={emailHandler}/>
    <div id="emailHelp" class="form-text">이메일주소는 로그인시 아이디로 사용됩니다.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword" class="form-label">비밀번호</label>
    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={passwordHandler}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">이름</label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={name} onChange={nameHandler}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">닉네임</label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={nickname} onChange={nicknameHandler}/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">휴대폰번호</label>
    <input type="text" class="form-control" id="exampleInputEmail1" value={phone} onChange={phoneHandler}/>
  </div>


  <button type="submit" class="btn btn-primary" onClick={signUpHandler}>회원가입</button>
</form>
        // <>
        //     <label>아이디 <input type="text" value={id} onChange={idHandler}/></label>
        //     <label>이름 <input type="text" value={name} onChange={nameHandler}/> </label> 
        //     <p>
        //         <button onClick={signUpHandler}>회원가입</button>
        //     </p>
        // </>
    ) 
}
export default SignUp;