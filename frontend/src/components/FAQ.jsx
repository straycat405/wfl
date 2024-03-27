import { Link } from 'react-router-dom';


export default function FAQ() {
    return(
        <>
        <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        WFL은 무엇인가요?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">WFL은 'Web Financial Ledger'라는 뜻으로, 수입/지출내역등 개인적인 재정을 보기 쉬운 표현을 통해 효과적으로 관리하고 지출을 줄이며 궁극적으로 금융목표를 달성하는 것을 목적으로 하는 웹 가계부 서비스입니다.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        WFL을 통해 무엇을 할 수 있나요?
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">기본적인 가계부 작성부터, 차트 등의 이미지를 통한 통계 조회, 정보 공유를 위한 커뮤니티 기능 등을 지원합니다.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        WFL을 이용하고 싶어요. 어디서 회원 등록이 가능한가요?
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">페이지 상단의 회원가입 버튼을 이용하거나, <Link to='/main'>이곳</Link>에서 가능합니다.</div>
    </div>
  </div>
</div>
        </>
    );
}