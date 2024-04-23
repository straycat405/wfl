import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router';
import axios from "axios";
import LedgerDetailTable from "../datatable/LedgerSpendingTable";

export default function LedgerDetail() {
  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();

  const { state } = useLocation();

  const [spendingData, setSpendingData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  console.log(state);
//   const [spendingCategoryData, setSpendingCategoryData] = useState([]);
//   const [incomeCategoryData, setIncomeCategoryData] = useState([]);
  useEffect(() => {

    if(sessionStorage.length == 0) {
        alert("우선 로그인해주세요");
        navigate("/login");
    }
    axios
    .get(baseUrl + "/ledger/spendingData?ledgerId=" + state[0].ledgerId)
    .then((res) => {
      console.log(res.data);
      setSpendingData(res.data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // axios
    // .get(baseUrl + "/ledger/incomeData?ledgerId=" + state[0].ledgerId)
    // .then((res) => {
    //   console.log(res.data);
    //   setIncomeData(res.data);
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // axios
    // .get(baseUrl + "/ledger/spendingCategoryData?ledgerId=" + state)
    // .then((res) => {
    //   console.log(res.data);
    //   setIncomeData(res.data);
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // axios
    // .get(baseUrl + "/ledger/incomeCategoryData?ledgerId=" + state)
    // .then((res) => {
    //   console.log(res.data);
    //   setIncomeData(res.data);
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

  }, []);

  return (
  <>
  <div className="my-4 text-center text-xl">
    <h2>현재 가계부 : {state[0].ledgerName}</h2>
  </div>
    <LedgerDetailTable spendingData={spendingData} incomeData={incomeData} />
  </>
  );
}
