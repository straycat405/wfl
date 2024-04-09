import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import TestModal from "./Modal";
import LedgerList from "./LedgerList";

export default function UserLedgerList() {

  let loginedUser = JSON.parse(sessionStorage.getItem('loginedUser'));

    const [data, setData] = useState([]);
    const [isOpen,setIsOpen] = useState(false);

    // 가계부 작성 Form 안의 변수들. state가 많아져서 하나로 묶음 (stateHandler 추가로 사용)
    const [state, setState] = useState({
      ledgerName: "",
      ledgerMemo: ""
    })

    const ledgerNameHandler = (e) => {
      setState({
        ...state,
        ledgerName: e.target.value
      })
    }

    const ledgerMemoHandler = (e) => {
      setState({
        ...state,
        ledgerMemo: e.target.value
      })
    }

    //가계부 작성 완료 후 제출 -> axios로 생성
    function ledgerSubmit() {
      if(state.ledgerName && state.ledgerMemo) {
      axios({
        method: "POST",
        url: baseUrl + "/ledger/newLedgerConfirm",
        data: {
          userId: loginedUser.userId,
          ledgerName: state.ledgerName,
          ledgerMemo: state.ledgerMemo,
        },
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          console.log(res.data);
          alert(res.data);
          setIsOpen(false);
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
          alert("통신 에러 발생, 다시 시도해주세요.");
        })
      } else {
        alert ("전부 작성해주세요");
      }
    }


    const baseUrl = "http://localhost:8080";

        // 처음에만 실행
        useEffect(() => {
            axios.get(baseUrl + "/ledger/myLedger?userId=" + loginedUser.userId)
              .then((res) => {
                setData(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }, []);


    function makeNewLedger() {

      setIsOpen(true);

      }


    const modalContent =
      <div>
        <h2>modal test</h2>

        <label>가계부 이름</label>
        <input value={state.ledgerName} onChange={ledgerNameHandler} placeholder="가계부 이름 입력"></input>

        <label>메모</label>
        <input value={state.ledgerMemo} onChange={ledgerMemoHandler} placeholder="메모"></input>

        <button onClick={ledgerSubmit}> 가계부 작성 </button>
      </div>


    return(
        <>
        <TestModal isOpen={isOpen} modalContent={modalContent} onClick={()=>{setIsOpen(false)}} />
        <div className="my-4 text-center text-2xl">
        <h2>나의 가계부 리스트</h2>
        </div>
        <LedgerList data={data}/>
      <div className="text-center">
      <button onClick={makeNewLedger}>가계부 생성</button>
      </div>
        </>
    );
}