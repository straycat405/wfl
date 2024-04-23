import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import LedgerSpendingTable from "../datatable/LedgerSpendingTable";
import { spendingCategoryList } from "../category/spendingCategoryList";
import { categories } from "../category/categories.jsx";
import ReactModal from "react-modal";
import moment from 'moment';

export default function Spending() {
  // axios 통신용 백 서버 url
  const baseUrl = "http://localhost:8080";

  // 현재 로그인 유저 정보 객체
  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  // 지출 데이터
  const [spendingData, setSpendingData] = useState([]);

  // 지출 입력 state
  const [state, setState] = useState({
    spendingDate: "",
    spendingAmount: null,
    spendingWhy: "",
    spendingMethod: null,
    spendingMemo: "",
  });

  const spendingDateHandler = (e) => {
    setState({
      ...state,
      spendingDate: e.target.value,
    });
  };

  const spendingAmountHandler = (e) => {
    setState({
      ...state,
      spendingAmount: e.target.value,
    });
  };

  const spendingWhyHandler = (e) => {
    setState({
      ...state,
      spendingWhy: e.target.value,
    });
  };

  const spendingMethodHandler = (e) => {
    setState({
      ...state,
      spendingMethod: e.target.value,
    });
  };

  const spendingMemoHandler = (e) => {
    setState({
      ...state,
      spendingMemo: e.target.value,
    });
  };

  // 입력 모달창 관리 state
  const [isOpen, setIsOpen] = useState(false);

  // 처음 렌더링시 실행
  useEffect(() => {
    if (sessionStorage.length == 0) {
      alert("우선 로그인해주세요");
      navigate("/login");
    }
    axios
      .get(baseUrl + "/ledger/spendingData?userId=" + loginedUser.userId)
      .then((res) => {
        console.log(res.data);
        setSpendingData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 모달 내용 (지출 입력)

  //테스트
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = parseInt(event.target.value);
    setSelectedCategory(
      categories.find((category) => category.id === selectedCategoryId)
    );
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryId = parseInt(event.target.value);
    setSelectedSubCategory(
      selectedCategory.subCategories.find(
        (subCategory) => subCategory.id === selectedSubCategoryId
      )
    );
  };

  /////////////////////////////////

  let category1 = [];
  for (let i = 0; i < spendingCategoryList.length; i++) {
    category1.push(key in spendingCategoryList);
  }

  const modalContent = (
    <div>
      <form>
        <h2>지출 입력</h2>

        <label>지출일</label>
        <input
          type="datetime-local"
          value={state.spendingDate}
          onChange={spendingDateHandler}
          placeholder="지출일"
        ></input>

        <label>지출금액</label>
        <input
          value={state.spendingAmount}
          onChange={spendingAmountHandler}
          placeholder="지출금액"
        ></input>

        <label>지출내역</label>
        <input
          value={state.spendingWhy}
          onChange={spendingWhyHandler}
          placeholder="지출내역"
        ></input>

        {/*  */}
        <div>
          <label>지출 카테고리 선택:</label>
          <select value={selectedCategory?.id} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div>
              <label>하위 카테고리 선택:</label>
              <select
                value={selectedSubCategory?.id}
                onChange={handleSubCategoryChange}
              >
                {selectedCategory.subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {/*  */}

        <label>결제수단</label>
        <input
          value={state.spendingMethod}
          onChange={spendingMethodHandler}
          placeholder="결제수단"
        ></input>

        <label>메모</label>
        <input
          value={state.spendingMemo}
          onChange={spendingMemoHandler}
          placeholder="메모"
        ></input>

      </form>
    </div>
  );

  function spendingSubmit() {
    axios({
      method: "POST",
      url: baseUrl + "/spendingInsert",
      data: {
        userId: loginedUser.userId,
        spendingTime: state.spendingDate,
        spendingAmount: state.spendingAmount,
        spendingWhy: state.spendingWhy,
        spendingCategory1: selectedCategory?.name,
        spendingCategory2: selectedSubCategory?.name,
        spendingMethod: state.spendingMethod,
        spendingMemo: state.spendingMemo
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        alert("지출내역 등록 성공");
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        alert("지출내역 등록 실패, 오류 발생");
        console.log(error);
      });
  }



  return (
    <>
      {/* <button onClick={test} >테스트</button> */}
      <div>
        <ReactModal 
        isOpen={isOpen}
        >
          {modalContent}
        <button className="flex m-4 p-2 rounded bg-green-400 text-white" onClick={spendingSubmit}> 확인 </button>
        <button className="flex m-4 p-2 rounded bg-green-400 text-white" onClick={()=>setIsOpen(false)}> 닫기 </button>
          

        </ReactModal>
      </div>
      <div className="text-center text-xl ">
      <h2> 지출 상세 내역 </h2>
      </div>
      <LedgerSpendingTable data={spendingData}/>
      <div className="text-center">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          지출 입력
        </button>
      </div>
    </>
  );
}
