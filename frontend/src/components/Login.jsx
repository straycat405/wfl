export default function Login() {
    return(
        <form>
  <div>
    <label>이메일</label>
    <input type="email"/>
    {/* <div id="emailHelp" class="form-text" hidden>We'll never share your email with anyone else.</div> */}
  </div>
  <div>
    <label>비밀번호</label>
    <input type="password"/>
  </div>
  <button type="submit">로그인</button>
</form>
    );
}