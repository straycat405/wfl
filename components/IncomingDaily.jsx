import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import LedgerIncomingTable from "../datatable/LedgerIncomingTable.jsx";
import { incomingCategoryList } from "../category/incomingCategoryList.jsx";
import { categories } from "../category/categories-income.jsx";
import ReactModal from "react-modal";
import moment from 'moment';
import { useLocation } from "react-router-dom";


export default function IncomingDaily() {
  // axios 통신용 백 서버 url
  const baseUrl = "http://localhost:8080";

  // 현재 로그인 유저 정보 객체
  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  // 수정 모달
  const [modifyIsOpen, setModifyIsOpen] = useState(false);

  const [incomingData, setIncomingData] = useState([]);



  const [state, setState] = useState({
    incomingDate: "",
    incomingAmount: null,
    incomingWhy: "",
    incomingMethod: null,
    incomingMemo: "",
  });

  const incomingDateHandler = (e) => {
    setState({
      ...state,
      incomingDate: e.target.value,
    });
  };

  const incomingAmountHandler = (e) => {
    setState({
      ...state,
      incomingAmount: e.target.value,
    });
  };


  const incomingWhyHandler = (e) => {
    setState({
      ...state,
      incomingWhy: e.target.value,
    });
  };


  const incomingMethodHandler = (e) => {
    setState({
      ...state,
      incomingMethod: e.target.value,
    });
  };


  const incomingMemoHandler = (e) => {
    setState({
      ...state,
      incomingMemo: e.target.value,
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
      url: baseUrl + "/ledger/incomingDailyData",
      data: {
        userId: loginedUser.userId,
        year: year,
        month: month,
        day: day,
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        setIncomingData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

        setState({
          ...state,
          incomingDate: moment(`${year}-${month}-${day} 00:00:00`).format('YYYY-MM-DD HH:mm:SS'),
        });


  }, []);

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
  for (let i = 0; i < incomingCategoryList.length; i++) {
    category1.push(key in incomingCategoryList);
  }

  const modalContent = (
    <div>
      <form className="m-4">
        <h2 className="m-12 text-center text-2xl font-semibold text-white">수입 입력</h2>
      <div className="m-2">
        <label className="m-4">수입일</label>
        <input
          className="w-60"
          type="datetime-local"
          value={state.incomingDate}
          onChange={incomingDateHandler}
          placeholder="수입일"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">수입금액</label>
        <input
        className="w-60"
          value={state.incomingAmount}
          onChange={incomingAmountHandler}
          placeholder="수입금액"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">수입내역</label>
        <input
        className="w-60"
          value={state.incomingWhy}
          onChange={incomingWhyHandler}
          placeholder="수입내역"
        ></input>
      </div>
        {/*  */}
        <div className="m-2">
          <label className="m-4">수입 카테고리 선택:</label>
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
          value={state.incomingMethod}
          onChange={incomingMethodHandler}
          placeholder="결제수단"
        ></input>
        </div>

        <div className="m-2">
        <label className="m-4">메모</label>
        <input
        className="w-60"
          value={state.incomingMemo}
          onChange={incomingMemoHandler}
          placeholder="메모"
        ></input>
        </div>
      </form>
    </div>
  );

  //시간데이터 포맷 변경 후 String으로 변환
  const sendTime = moment(state.incomingDate).format("YYYY-MM-DD HH:mm:SS").toString();

  function incomingSubmit() {
    axios({
      method: "POST",
      url: baseUrl + "/incomingInsert",
      data: {
        userId: loginedUser.userId,
        incomingTime: sendTime,
        incomingAmount: state.incomingAmount,
        incomingWhy: state.incomingWhy,
        incomingCategory1: selectedCategory?.name,
        incomingCategory2: selectedSubCategory?.name,
        incomingMethod: state.incomingMethod,
        incomingMemo: state.incomingMemo
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        alert("수입내역 등록 성공");
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        alert("수입내역 등록 실패, 오류 발생");
        console.log(error);
      });
  }

    // 수정 객체
    const [modifyData,setModifyData] = useState([]);
    const [mIncomingDate, setMIncomingDate] = useState();
    const [mIncomingAmount, setMIncomingAmount] = useState();
    const [mIncomingWhy, setMIncomingWhy] = useState();
    const [mIncomingMethod, setMIncomingMethod] = useState();
    const [mIncomingMemo, setMIncomingMemo] = useState();
    const [mIncomingCategory1, setMIncomingCateogory1] = useState();
    const [mIncomingCategory2, setMIncomingCateogory2] = useState();

  // 수정버튼 함수
  function modifyIncoming(incomingId) {

    axios
    .get(baseUrl + "/getModifyIncoming?incomingId=" + incomingId)
    .then((res) => {
      console.log(res.data);
      setModifyData(res.data);
      setMIncomingDate(modifyData.incomingTime);
      setMIncomingAmount(modifyData.incomingAmount);
      setMIncomingWhy(modifyData.incomingWhy);
      setMIncomingMethod(modifyData.incomingMethod);
      setMIncomingMemo(modifyData.incomingMemo);
      setMIncomingCateogory1(modifyData.incomingCategory1);
    })
    .catch((err) => {
      console.log(err);
    });
    
    setModifyIsOpen(true);
    console.log(incomingId);

  }

// 수정 폼

  const modifyContent = (
    <div>
      <form className="m-4">
        <h2 className="m-12 text-center text-2xl font-semibold text-white">수입 수정</h2>
      <div className="m-2">
        <label className="m-4">수입일</label>
        <input
          className="w-60"
          type="datetime-local"
          value={mIncomingDate}
          onChange={(e) => setMIncomingDate(e.target.value)}
          placeholder="수입일"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">수입금액</label>
        <input
        className="w-60"
          value={mIncomingAmount}
          onChange={(e) => setMIncomingAmount(e.target.value)}
          placeholder="수입금액"
        ></input>
      </div>
      <div className="m-2">
        <label className="m-4">수입내역</label>
        <input
        className="w-60"
          value={mIncomingWhy}
          onChange={(e) => setMIncomingWhy(e.target.value)}
          placeholder="수입내역"
        ></input>
      </div>
        {/*  */}
        <div className="m-2">
          <label className="m-4">수입 카테고리 선택:</label>
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
          value={mIncomingMethod}
          onChange={(e) => setMIncomingMethod(e.target.value)}
          placeholder="결제수단"
        ></input>
        </div>

        <div className="m-2">
        <label className="m-4">메모</label>
        <input
        className="w-60"
          value={mIncomingMemo}
          onChange={(e) => setMIncomingMemo(e.target.value)}
          placeholder="메모"
        ></input>
        </div>
      </form>
    </div>
  );


  const modifiedSendTime = moment(mIncomingDate).format("YYYY-MM-DD HH:mm:SS").toString();




  // 수정버튼 제출
  function modifySubmit() {
    axios({
      method: "POST",
      url: baseUrl + "/modifyIncomingConfirm",
      data: {
        userId: loginedUser.userId,
        incomingId: modifyData.incomingId,
        incomingTime: modifiedSendTime,
        incomingAmount: mIncomingAmount,
        incomingWhy: mIncomingWhy,
        incomingMethod: mIncomingMethod,
        incomingMemo: mIncomingMemo 
      },
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        alert("수입내역 수정 성공");
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        alert("수입내역 수정 실패, 오류 발생");
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
        <button className="m-8 w-16 h-12 rounded bg-green-400 text-white" onClick={incomingSubmit}> 확인 </button>
        <button className="m-8 w-16 h-12 rounded bg-green-400 text-red-600" onClick={()=>setIsOpen(false)}> 닫기 </button>
        </div>
          

        </ReactModal>
      </div>
      <div className="text-center text-xl ">
      <h2> 수입 상세 내역 </h2>
      </div>
      <LedgerIncomingTable data={incomingData} modifyIncoming={modifyIncoming}/>
      <div className="text-center">
        <button
          className="w-24 h-12 rounded bg-green-500 text-white hover:bg-green-600"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          수입 입력
        </button>
      </div>
    </>
  );
}
