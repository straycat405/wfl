export default function Login() {
    return(
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">이메일</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    {/* <div id="emailHelp" class="form-text" hidden>We'll never share your email with anyone else.</div> */}
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">비밀번호</label>
    <input type="password" class="form-control" id="exampleInputPassword1" />
  </div>
  {/* <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">아이디 기억하기</label>
  </div> */}
  <button type="submit" class="btn btn-primary">로그인</button>
</form>
    );
}