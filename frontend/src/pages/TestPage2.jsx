import axios from 'axios';
import React, { useState } from 'react';

export default function TestPage2() {

  const baseUrl = "http://localhost:8080";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailCheck = () => {
    // 이메일 중복 확인 로직
    console.log('중복 확인');
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 회원가입 로직
    console.log('회원가입');
  };

  async function submitSignup() {
    await axios
    .post(baseUrl + "/post-test" ,
    {"userEmail":email,
      "userPw":password,
      "userName":name,
      "userPhone":phoneNumber
    })
    .then((res) => {
      alert("서버에서 받은 데이터\n" + JSON.stringify(res.data))
    })
    .catch((err) => {
      console.log(err)
    })

  }


    return(
      <div>
      <h2>소셜계정으로 3초 가입하기</h2>
      <div>
        <button>구글</button>
        <button>카카오톡</button>
        <button>페이스북</button>
        <button>네이버</button>
        <button>애플</button>
      </div>
      <p>--------또는--------</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일 주소:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="button" onClick={handleEmailCheck}>중복확인</button>
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="button" onClick={handlePasswordVisibility}>
            {showPassword ? '비공개' : '보기'}
          </button>
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          <button type="button" onClick={handlePasswordVisibility}>
            {showPassword ? '비공개' : '보기'}
          </button>
        </div>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">휴대폰 번호:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
          <select>
            <option>SKT</option>
            <option>KT</option>
            <option>LG U+</option>
          </select>
          <button type="button">통신사 인증</button>
        </div>
        <button type="submit" onClick={submitSignup}>회원가입</button>
      </form>
    </div>

    );
}
