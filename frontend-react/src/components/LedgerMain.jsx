import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LedgerMain() {

    const baseUrl = "http://localhost:8080";

  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  const navigate = useNavigate();

    const [data, setData] = useState([]);

      // 처음 렌더링시 실행
  useEffect(() => {
    if (sessionStorage.length == 0) {
      alert("우선 로그인해주세요");
      navigate("/login");
    }
    axios
      .get(baseUrl + "/ledger/totalSpendingData?userId=" + loginedUser.userId)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
        <>
        <h2 className="m-12 text-center text-2xl font-semibold">지출 내역</h2>
        <>
      <div className="flex flex-col">
        <div className="w-3/6 overflow-x-auto m-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      일자
                    </th>
                    <th scope="col" className="px-6 py-4">
                      지출 총 금액
                    </th>
                    <th scope="col" className="px-6 py-4">
                      상세보기
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={i.months}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i.years +"-"+ i.months +"-"+ i.days}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.daystotal}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button onClick={()=>{navigate((`/ledger/spending/` + loginedUser.userEmail + "/" + i.years + "" + i.months + "" + i.days),                
                         {
                            state: {
                                years: i.years,
                                months: i.months,
                                days: i.days
                            }
                        })
                    }}>상세보기</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>


        </>
    );
}