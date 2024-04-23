import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function IncomeMain() {

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
      .get(baseUrl + "/ledger/totalIncomingData?userId=" + loginedUser.userId)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const todayYear = moment().format('YYYY');
  const todayMonth = moment().format('MM');
  const todayDay = moment().format('DD');

    return (
        <>
        <h2 className="m-12 text-center text-2xl font-semibold">수입 내역</h2>
        <>
      <div className="flex flex-col content-center">
        <div className="overflow-x-auto m-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      일자
                    </th>
                    <th scope="col" className="px-6 py-4">
                      수입 총 금액
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
                      <td className="whitespace-nowrap px-6 py-4 text-green-600">
                        {i.daystotal.toLocaleString() + " 원"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button onClick={()=>{navigate((`/ledger/incoming/` + loginedUser.userEmail + "/" + i.years + "" + i.months + "" + i.days),                
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
              <div className="m-12 text-center text-xl">
                {data.length == 0 ? '작성한 가계부가 없습니다.' : null}
              </div>
              <div className="flex place-content-center mb-16 w-32 h-12 bg-green-500 rounded hover:bg-green-600 text-white translate-x-28">
                <button onClick={()=>{navigate((`/ledger/incoming/` + loginedUser.userEmail + "/" + todayYear + "" + todayMonth + "" + todayDay),                
                         {
                            state: {
                                years: todayYear,
                                months: todayMonth,
                                days: todayDay
                            }
                        })
                    }}>수입 작성하기</button>
              </div>

            </div>

          </div>
        </div>
      </div>

    </>


        </>
    );
}