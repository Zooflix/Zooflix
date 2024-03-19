import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartData } from 'chart.js/auto';

interface DonutChartProps {
  data: ChartData;
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
//   const chartContainer = useRef<HTMLCanvasElement>(null);
//   const [chartInstance, setChartInstance] = useState<Chart | null>(null);

//   useEffect(() => {
//     if (chartContainer && chartContainer.current) {
//       const ctx = chartContainer.current.getContext('2d');
//       if (ctx) {
//         const newChartInstance = new Chart(ctx, {
//           type: 'doughnut',
//           data: data,
//           options: {
//             plugins: {
//               legend: {
//                 display: false, // 중앙 하단 부분의 범례를 없앰
//               },
//               tooltip: {
//                 enabled: false, // 툴팁 비활성화
//               },
//             },
//           },
//         });
//         setChartInstance(newChartInstance);
//       }
//     }
//   }, [chartContainer, data]);

//   // 도넛 차트 결과값을 텍스트로 반환하는 함수
//   const getChartValue = (): string => {
//     if (chartInstance) {
//       const value = chartInstance.data.datasets?.[0].data.reduce(
//         (acc: number, cur: number) => acc + cur,
//         0
//       );
//       return value ? value.toFixed(2) : '';
//     }
//     return '';
//   };

  return (
    <div>
      {/* <canvas ref={chartContainer} />
      <div>도넛 차트 결과: {getChartValue()}</div> */}
    </div>
  );
};

export default DonutChart;
