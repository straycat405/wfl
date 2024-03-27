import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      id="mainNav"
    >
      <div class="container px-4">
        <Link class="navbar-brand offset-md-0" to="/main">
          WFL
        </Link>
        {/* <a class="navbar-brand" href="#page-top">WFL</a> */}
        {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> */}
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/main">
                도움말
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav offset-md-9">
            <li class="nav-item">
              <a class="nav-link" href="#contact">
                로그인
              </a>
            </li>
            <li>
      {/* 드롭다운 버튼 */}
      <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            더보기
          </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li class="m-1">
                <a class="ms-2" href="네이버계정로그인"><img src="../src/assets/images/btnW_icon_circle.png" width="20%"></img></a>
                <a class="ms-2" href="카카오계정로그인"><img src="../src/assets/images/kakaologo.png" width="20%"></img></a>
                <a class="ms-2" href="구글계정로그인"><img src="../src/assets/images/g2.png" width="20%" style={{borderRadius:100}}></img></a>
            </li>
            <li><a class="dropdown-item" href="#">회원가입</a></li>
            <li><a class="dropdown-item" href="#">비밀번호 찾기</a></li>
          </ul>
        </li>
      </ul>
    </div>
    {/*  */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
