import React, { useEffect } from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  layouts,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

export default function Chart() {
  //ChartJS 사용을 위한 플러그인 등록
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //컴포넌트 불러올때 월간 지출자료 API통신
  useEffect(() => {
    axios
      .get(baseUrl + "/getMonthSpending?userId=" + loginedUser.userId)
      .then((res) => {
        setChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const baseUrl = "http://localhost:8080";

  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  // BarChart 토글
  const [IsOpen, setIsOpen] = useState("MONTH");

  const [chartData, setChartData] = useState([]);

  // 연도 세팅
  const [year, setYear] = useState(parseInt(moment().format("YYYY")));
  const nextYear = year + 1;
  const prevYear = year - 1;

  // 받아온 데이터에서 현재연도만 필터
  const findData = chartData.filter((e) => e.years == year);

  // 연간 합산액 구하기
  let yearSum = 0;

  for (let i = 0; i < findData.length; i++) {
    yearSum += findData[i].monthtotal;
  }

  // 연간 최대,최소 지출 월 구하기
  const monthValue = [];

  for (let i = 0; i < findData.length; i++) {
    monthValue.push(findData[i].monthtotal);
  }

  const maxValue = findData.find(
    (e) => e.monthtotal == Math.max(...monthValue)
  );
  const minValue = findData.find(
    (e) => e.monthtotal == Math.min(...monthValue)
  );

  //월간 지출조회
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${year}년 월별 지출내역`,
      },
    },
  };

  const labels = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "지출",
        data: findData.map((e) => e.monthtotal),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
        ],
      },
    ],
  };

  const [categoryData, setCategoryData] = useState([]);

  function getCategoryData() {
    console.log("카테고리별 지출 내역 차트 조회");
    axios
      .get(baseUrl + "/getCategorySpending?userId=" + loginedUser.userId)
      .then((res) => {
        setCategoryData(res.data);
        console.log(categoryData);
      })
      .catch((err) => {
        console.log(err);
      });

      console.log(categoryData.filter((e) => e.years == year));
      console.log(categoryData.spendingCategory1);
      console.log(categoryData.map((e) => e.spendingCategory1));
  }


  return (
    <>
      <div className="grid place-items-center  h-20">
        <button
          className="flex  w-32 justify-center"
          onClick={() => setIsOpen("MONTH")}
        >
          월별 지출내역
        </button>
      </div>
      {IsOpen == "MONTH" && (
        <>
          <div className="m-auto text-center">
            <button
              className="m-4 p-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => {
                setYear((prev) => prev - 1);
              }}
            >
              {prevYear}년
            </button>
            <span className="m-4 text-green-500 font-semibold">{year}년</span>
            <button
              className="m-4 p-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => {
                setYear((prev) => prev + 1);
              }}
            >
              {nextYear}년
            </button>
          </div>
          <div className="w-3/5 m-auto">
            <Bar options={options} data={data} />
          </div>
          <div className="text-center">
            <p className="m-2">
              {year}년 총 지출액은{" "}
              <span className="text-orange-400">
                {yearSum.toLocaleString()}
              </span>
              원 입니다.
            </p>
            <p className="m-2">
              {" "}
              월 평균 지출액은{" "}
              <span className="text-orange-400">
                {Math.floor(yearSum / 12).toLocaleString()}
              </span>
              원 입니다.
            </p>
            <p className="m-2">
              가장 소비가 많았던 달은{" "}
              <span className="text-orange-400">{maxValue?.months}</span>
              월입니다. 총{" "}
              <span className="text-orange-400">
                {findData.length !== 0
                  ? Math.max(...monthValue).toLocaleString()
                  : 0}
              </span>
              원을 지출했습니다.
            </p>
            <p className="m-2">
              가장 소비가 적었던 달은{" "}
              <span className="text-orange-400">{minValue?.months}</span>
              월입니다. 총{" "}
              <span className="text-orange-400">
                {findData.length !== 0
                  ? Math.min(...monthValue).toLocaleString()
                  : 0}
              </span>
              원을 지출했습니다.
            </p>
          </div>
        </>
      )}
      {IsOpen == "CATEGORY" && (
        <> 
         
        </>
      )}
    </>
  );
}
