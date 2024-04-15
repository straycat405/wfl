import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BarChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(...registerables);
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월","8월","9월","10월", "11월","12월"],
          datasets: [
            {
              label: "지출 금액",
              data: [400000, 200000, 300000, 400000, 500000, 600000, 400000, 200000, 700000, 350000, 650000 ], //데이터 들어가는 곳
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 1000000,
            },
          },
        },
      });
    };

    const destroyChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };

    destroyChart(); // 기존 차트 파괴
    createChart(); // 새로운 차트 생성

    return () => {
      destroyChart(); // 컴포넌트가 unmount될 때 차트 파괴
    };
  }, []);

  return (
    <>
    <Navbar />
    <canvas id="mychart" width="500" height="200" ref={chartRef} />
    <Footer />
    </>
  );
  
};

export default BarChart;