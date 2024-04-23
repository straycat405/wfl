import { Link } from "react-router-dom";

export default function Header() {
    return(
<section className="text-gray-600 body-font h-dvh flex bg-white bg-svg-constellation-gray-100 relative">
  <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
    <div className="lg:w-2/3 w-full animate-fade-in-down">
      <h1 className="md:text-6xl text-3xl mb-5 font-bold text-gray-700 tracking-tight leading-tight">
      WFL이란?
      </h1>
      <h1 className="md:text-5xl text-3xl mb-4 font-bold text-gray-600 tracking-normal leading-tight">
        <span className="border-b-4 border-green-400 -mb-20">Web Financial Ledger</span>를 의미합니다.
      </h1>
      <p className="mt-8 mb-16 md:leading-relaxed leading-normal text-gray-500 tracking-tight text-md">
      WFL은 수입/지출내역 등 개인적인 재정을 보기 쉬운 표현을 통해 효과적으로 관리하고 지출을 줄이며 궁극적으로 금융목표를 달성하는 것을 목적으로 하는 웹 가계부 서비스입니다.</p>
      <Link className="uppercase rounded-sm bg-green-500 font-bold text-white px-8 py-4 mx-auto hidden md:inline hover:bg-green-600"
        to="/signup">시작하기</Link>
    </div>
  </div>
</section>
    );
}