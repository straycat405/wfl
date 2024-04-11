import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import LedgerSpendingTable from "../datatable/LedgerSpendingTable";
import Modal from "../components/Modal";

export default function Spending() {
  const baseUrl = "http://localhost:8080";

  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  const [spendingData, setSpendingData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

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

  function makeNewLedger() {
    setIsOpen(true);
  }

  const modalContent = (
    <div>
      <h2>modal test</h2>

      <label>가계부 이름</label>
      <input
        value={"1"}
        placeholder="가계부 이름 입력"
      ></input>

      <label>메모</label>
      <input
        value={"2"}
        placeholder="메모"
      ></input>

      <button onClick={ledgerSubmit}> 가계부 작성 </button>
    </div>
  );

  function ledgerSubmit() {

  }

  return (
    <>
        <Modal isOpen={isOpen} modalContent={modalContent} onClick={()=>{setIsOpen(false)}} />
      <h2> Spending Page </h2>
      <LedgerSpendingTable data={spendingData} />
      <div className="text-center">
        <button onClick={makeNewLedger}>가계부 생성</button>
      </div>
    </>
  );
}
