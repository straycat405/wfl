import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const LineChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const createChart = () => {
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement
      );
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월","8월","9월","10월", "11월","12월"],
          datasets: [
            {
              label: "Data 1",
              data: [0, 200000, 300000, 400000, 500000, 600000, 400000, 200000, 700000, 350000, 650000 ], //데이터 들어가는 곳
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              pointRadius: 5, // 포인트 크기
              pointBackgroundColor: "rgba(255, 99, 132, 1)", // 포인트 배경색
              pointBorderColor: "rgba(255, 255, 255, 1)", // 포인트 테두리 색
              pointHoverRadius: 7, // 호버 시 포인트 크기
              pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // 호버 시 포인트 배경색
              pointHoverBorderColor: "rgba(255, 255, 255, 1)", // 호버 시 포인트 테두리 색
              fill: false, // 라인 그래프에서 영역 채우기 비활성화
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
            },
            y: {
              beginAtZero: true,
              max: 1000000, // 최대값 설정
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

    const initializeChart = () => {
      destroyChart(); // 이전 차트 파괴
      createChart(); // 새로운 차트 생성
    };

    // 컴포넌트가 처음 렌더링될 때 차트 초기화
    initializeChart();

    // 컴포넌트가 unmount될 때 차트 파괴
    return () => {
      destroyChart();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;