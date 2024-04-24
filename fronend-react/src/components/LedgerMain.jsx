import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function LedgerMain() {

  const baseUrl = "http://localhost:8080";

  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));

  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));

  const years = Array.from({ length: 10 }).map((_, index) =>
    moment().subtract(index, "years").format("YYYY")
  );

  useEffect(() => {
    if (sessionStorage.length == 0) {
      alert("우선 로그인해주세요");
      navigate("/login");
      return;
    }
    axios({
      method: "POST",
      url: baseUrl + "/ledger/totalSpendingData",
      data: {
        userId: loginedUser.userId,
        year: selectedYear.toString(),
        month: selectedMonth.toString().substr(5, 2),
      },
      headers: { "Content-type": "application/json" },
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });

  }, [selectedYear, selectedMonth]);

  // data값이 바뀔 때마다 리렌더링

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  }

  const todayYear = moment().format("YYYY");
  const todayMonth = moment().format("MM");
  const todayDay = moment().format("DD");

  // 엑셀데이터 다운로드

  function getExcelData() {

    axios
      .get(baseUrl + "/getExcelMonthData")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("excel");
  }

  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-semibold">지출 내역</h2>
      <>
      <div className="flex flex-wrap justify-center mb-4">
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className="border rounded px-3 py-2 mr-4"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
        {/* ... (rest of month buttons) */}
      </div>

       <div className="flex flex-wrap justify-center mb-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <button
              key={index}
              className={`m-1 px-4 py-2 rounded hover:bg-green-400 ${selectedMonth === selectedYear + '-' + (index + 1).toString().padStart(2, '0') ? 'bg-green-300' : ''}`}
              onClick={() => handleMonthChange(selectedYear + '-' + (index + 1).toString().padStart(2, '0'))}
            >
              {index + 1}월
            </button>
          ))}
        </div>

        {/*  */}
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
                        지출 총 금액
                      </th>
                      <th scope="col" className="px-6 py-4">
                        상세보기
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter((item) =>
                        moment(item.years + "-" + item.months).isSame(
                          moment(selectedMonth)
                        )
                      )
                      .map((i) => (
                        <tr
                          className="border-b border-neutral-200 dark:border-white/10"
                          key={i.days}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i.years + "-" + i.months + "-" + i.days}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-red-500">
                            {i.daystotal.toLocaleString() + " 원"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              onClick={() => {
                                navigate(
                                  `/ledger/spending/` +
                                    loginedUser.userEmail +
                                    "/" +
                                    i.years +
                                    "" +
                                    i.months +
                                    "" +
                                    i.days,
                                  {
                                    state: {
                                      years: i.years,
                                      months: i.months,
                                      days: i.days,
                                    },
                                  }
                                );
                              }}
                            >
                              상세보기
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="m-12 text-center text-xl">
                  {data.length == 0 ? "작성한 가계부가 없습니다." : null}
                </div>
                <div className="flex place-content-center">
                  <button
                    className="w-32 m-4 p-3 rounded text-sm bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      navigate(
                        `/ledger/spending/` +
                          loginedUser.userEmail +
                          "/" +
                          todayYear +
                          "" +
                          todayMonth +
                          "" +
                          todayDay,
                        {
                          state: {
                            years: todayYear,
                            months: todayMonth,
                            days: todayDay,
                          },
                        }
                      );
                    }}
                  >
                    지출 작성하기
                  </button>
                  <form action = {baseUrl + "/getExcelMonthData"} method="post">
                  <input type="text" name="userId" value={ loginedUser.userId } hidden></input>
                  <input type="text" name="userName" value={ loginedUser.userName } hidden></input>
                  <input type="text" name="year" value={selectedYear} hidden></input>
                  <input type="text" name="month" value={selectedMonth.substr(5,2)} hidden></input>
                  <button
                    type="submit"
                    className="w-32 m-4 p-3 rounded text-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                                        엑셀 다운로드
                  </button>
                  </form>
                  <div>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
