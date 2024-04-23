import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import LedgerSpendingTable from "../datatable/LedgerSpendingTable.jsx";
import { spendingCategoryList } from "../category/spendingCategoryList.jsx";
import { categories } from "../category/categories.jsx";
import ReactModal from "react-modal";
import moment from 'moment';
import { useLocation } from "react-router-dom";


// 로그인 -> 지출 일별 합계 리스트 -> 상세보기를 통한 일별 개별 리스트
export default function SpendingDaily() {
  // axios 통신용 백 서버 url
  const baseUrl = "http://localhost:8080";

  // 현재 로그인 유저 정보 객체
  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  // 수정 모달
  const [modifyIsOpen, setModifyIsOpen] = useState(false);

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

  // navigate로 받아온 날짜정보
  const location = useLocation();

  // 처음 렌더링시 실행
  useEffect(() => {
    console.log(location.state.years);
    console.log(location.state.months);
    console.log(location.state.days);


    const year = location.state.years;
    const month = location.state.months;
    const day = location.state.days;

    console.log(moment(`${year}-${month}-${day} 00:00:00`).format('YYYY-MM-DD HH:mm:SS'));



    if (sessionStorage.length == 0) {
      alert("우선 로그인해주세요");
      navigate("/login");
    }
    axios({
      method: "POST",
      url: baseUrl + "/ledger/spendingDailyData",
      data: {
        userId: loginedUser.userId,
        year: year,
        month: month,
        day: day,
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        setSpendingData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

        setState({
          ...state,
          spendingDate: moment(`${year}-${month}-${day} 00:00:00`).format('YYYY-MM-DD HH:mm:SS'),
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

  let category1 = [];
  for (let i = 0; i < spendingCategoryList.length; i++) {
    category1.push(key in spendingCategoryList);
  }

  const modalContent = (
    <div>
      <form className="m-4">
        <h2 className="m-12 text-center text-2xl font-semibold text-white">지출 입력</h2>
      <div className="m-2">
        <label className="m-4">지출일</label>
        <input
          className="w-60"
          type="datetime-local"
          value={state.spendingDate}
          onChange={spendingDateHandler}
          placeholder="지출일"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">지출금액</label>
        <input
        className="w-60"
          value={state.spendingAmount}
          onChange={spendingAmountHandler}
          placeholder="지출금액"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">지출내역</label>
        <input
        className="w-60"
          value={state.spendingWhy}
          onChange={spendingWhyHandler}
          placeholder="지출내역"
        ></input>
      </div>
        {/*  */}
        <div className="m-2">
          <label className="m-4">지출 카테고리 선택:</label>
          <select 
          
          value={selectedCategory?.id} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div className="m-2">
              <label className="m-4">하위 카테고리 선택:</label>
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
        <div className="m-2">
        <label className="m-4">결제수단</label>
        <input
        className="w-60"
          value={state.spendingMethod}
          onChange={spendingMethodHandler}
          placeholder="결제수단"
        ></input>
        </div>

        <div className="m-2">
        <label className="m-4">메모</label>
        <input
        className="w-60"
          value={state.spendingMemo}
          onChange={spendingMemoHandler}
          placeholder="메모"
        ></input>
        </div>
      </form>
    </div>
  );

  //시간데이터 포맷 변경 후 String으로 변환
  const sendTime = moment(state.spendingDate).format("YYYY-MM-DD HH:mm:SS").toString();

  function spendingSubmit() {
    axios({
      method: "POST",
      url: baseUrl + "/spendingInsert",
      data: {
        userId: loginedUser.userId,
        spendingTime: sendTime,
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

    // 수정 객체
    const [modifyData,setModifyData] = useState([]);
    const [mSpendingDate, setMSpendingDate] = useState();
    const [mSpendingAmount, setMSpendingAmount] = useState();
    const [mSpendingWhy, setMSpendingWhy] = useState();
    const [mSpendingMethod, setMSpendingMethod] = useState();
    const [mSpendingMemo, setMSpendingMemo] = useState();
    const [mSpendingCategory1, setMSpendingCateogory1] = useState();
    const [mSpendingCategory2, setMSpendingCateogory2] = useState();

  // 수정버튼 함수
  function modifySpending(spendingId) {

    axios
    .get(baseUrl + "/getModifySpending?spendingId=" + spendingId)
    .then((res) => {
      console.log(res.data);
      setModifyData(res.data);
      setMSpendingDate(modifyData.spendingTime);
      setMSpendingAmount(modifyData.spendingAmount);
      setMSpendingWhy(modifyData.spendingWhy);
      setMSpendingMethod(modifyData.spendingMethod);
      setMSpendingMemo(modifyData.spendingMemo);
      setMSpendingCateogory1(modifyData.spendingCategory1);
    })
    .catch((err) => {
      console.log(err);
    });
    
    setModifyIsOpen(true);
    console.log(spendingId);

  }

// 수정 폼

  const modifyContent = (
    <div>
      <form className="m-4">
        <h2 className="m-12 text-center text-2xl font-semibold text-white">지출 수정</h2>
      <div className="m-2">
        <label className="m-4">지출일</label>
        <input
          className="w-60"
          type="datetime-local"
          value={mSpendingDate}
          onChange={(e) => setMSpendingDate(e.target.value)}
          placeholder="지출일"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">지출금액</label>
        <input
        className="w-60"
          value={mSpendingAmount}
          onChange={(e) => setMSpendingAmount(e.target.value)}
          placeholder="지출금액"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">지출내역</label>
        <input
        className="w-60"
          value={mSpendingWhy}
          onChange={(e) => setMSpendingWhy(e.target.value)}
          placeholder="지출내역"
        ></input>
      </div>
        {/*  */}
        <div className="m-2">
          <label className="m-4">지출 카테고리 선택:</label>
          <select 
          value={selectedCategory?.id} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div className="m-2">
              <label className="m-4">하위 카테고리 선택:</label>
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
        <div className="m-2">
        <label className="m-4">결제수단</label>
        <input
        className="w-60"
          value={mSpendingMethod}
          onChange={(e) => setMSpendingMethod(e.target.value)}
          placeholder="결제수단"
        ></input>
        </div>

        <div className="m-2">
        <label className="m-4">메모</label>
        <input
        className="w-60"
          value={mSpendingMemo}
          onChange={(e) => setMSpendingMemo(e.target.value)}
          placeholder="메모"
        ></input>
        </div>
      </form>
    </div>
  );


  const modifiedSendTime = moment(mSpendingDate).format("YYYY-MM-DD HH:mm:SS").toString();




  // 수정버튼 제출
  function modifySubmit() {
    axios({
      method: "POST",
      url: baseUrl + "/modifySpendingConfirm",
      data: {
        userId: loginedUser.userId,
        spendingId: modifyData.spendingId,
        spendingTime: modifiedSendTime,
        spendingAmount: mSpendingAmount,
        spendingWhy: mSpendingWhy,
        spendingMethod: mSpendingMethod,
        spendingMemo: mSpendingMemo 
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        alert("지출내역 수정 성공");
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        alert("지출내역 수정 실패, 오류 발생");
        console.log(error);
      });

  }



  return (
    <>
      <div>
        <ReactModal className="m-auto translate-y-40 flex flex-col w-2/6 items-center rounded bg-green-500"
        isOpen={modifyIsOpen}
        >
          {modifyContent}
          <div>
        <button className="m-8 w-16 h-12 rounded bg-green-400 text-white" onClick={modifySubmit}> 확인 </button>
        <button className="m-8 w-16 h-12 rounded bg-green-400 text-red-600" onClick={()=>setModifyIsOpen(false)}> 닫기 </button>
        </div>
          

        </ReactModal>
      </div>


      <div>
        <ReactModal className="m-auto translate-y-40 flex flex-col w-2/6 items-center rounded bg-green-500"
        isOpen={isOpen}
        >
          {modalContent}
          <div>
        <button className="m-8 w-16 h-12 rounded bg-green-400 text-white" onClick={spendingSubmit}> 확인 </button>
        <button className="m-8 w-16 h-12 rounded bg-green-400 text-red-600" onClick={()=>setIsOpen(false)}> 닫기 </button>
        </div>
          

        </ReactModal>
      </div>
      <div className="text-center text-xl ">
      <h2> 지출 상세 내역 </h2>
      </div>
      <LedgerSpendingTable data={spendingData} modifySpending={modifySpending}/>
      <div className="text-center">
        <button
          className="w-24 h-12 rounded bg-green-500 text-white hover:bg-green-600"
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
