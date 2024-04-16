import React from "react";
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
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import moment from "moment";
import axios from "axios";

export default function BarChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const baseUrl = "http://localhost:8080";

  let loginedUser = JSON.parse(sessionStorage.getItem("loginedUser"));

  const [year, setYear] = useState(parseInt(moment().format("YYYY")));

  const nextYear = year + 1;
  const prevYear = year - 1;

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
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000000 })),
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

  function callData() {
    axios.get(baseUrl + "/getMonthSpending?userId=" + loginedUser.userId)
      .then((res) => {
        console.log(res.data);
      })
  }

  return (
    <>
    <button onClick={callData}>test</button>
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
    </>
  );
}
