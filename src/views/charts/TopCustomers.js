// /* eslint-disable no-underscore-dangle,no-unused-vars */
// import React, { useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { fTopCustomers } from './ChartSlice';

// const TopCustomers = () => {
//   const dispatch = useDispatch();
//   const { themeValues } = useSelector((state) => state.settings);
//   const { topCustomers , topCustomersStatus , topCustomersError } = useSelector((state) => state.chart);
//   const chartContainer = useRef(null);

//     // 📥 Fetch Top Customers from backend
//     useEffect(() => {
//         dispatch(fTopCustomers());
//     }, [dispatch]);

//   const LegendLabels = React.useMemo(() => {
//     return {
//       font: {
//         size: 14,
//         family: themeValues.font,
//       },
//       padding: 20,
//       usePointStyle: true,
//       boxWidth: 10,
//     };
//   }, [themeValues , topCustomers]);
//   const ChartTooltip = React.useMemo(() => {
//     return {
//       enabled: true,
//       position: 'nearest',
//       backgroundColor: themeValues.foreground,
//       titleColor: themeValues.primary,
//       titleFont: themeValues.font,
//       bodyColor: themeValues.body,
//       bodyFont: themeValues.font,
//       bodySpacing: 10,
//       padding: 15,
//       borderColor: themeValues.separator,
//       borderWidth: 1,
//       cornerRadius: parseInt(themeValues.borderRadiusMd, 10),
//       displayColors: false,
//       intersect: true,
//       mode: 'point',
//     };
//   }, [themeValues , topCustomers]);

//   const data = React.useMemo(() => {
//     return {
//       labels: ['January', 'February', 'March', 'April'],
//       datasets: [
//         {
//           label: 'Breads',
//           borderColor: themeValues.primary,
//           backgroundColor: `rgba(${themeValues.primaryrgb},0.1)`,
//           data: [456, 479, 324, 569],
//         },
//       ],
//     };
//   }, [themeValues , topCustomers]);
//   const config = React.useMemo(() => {
//     return {
//       type: 'bar',
//       options: {
//         indexAxis: 'y',
//         elements: {
//           bar: {
//             borderWidth: 1.5,
//             borderRadius: parseInt(themeValues.borderRadiusMd, 10),
//             borderSkipped: false,
//           },
//         },
//         plugins: {
//           crosshair: false,
//           datalabels: false,
//           legend: {
//             position: 'bottom',
//             labels: LegendLabels,
//           },
//           tooltip: ChartTooltip,
//           streaming: false,
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             min: 300,
//             max: 600,
//             grid: {
//               display: false,
//               drawBorder: false,
//             },
//           },
//           y: {
//             grid: {
//               display: true,
//               lineWidth: 1,
//               color: themeValues.separatorLight,
//               drawBorder: false,
//             },
//             ticks: {
//               stepSize: 100,
//               padding: 8,
//               fontColor: themeValues.alternate,
//             },
//           },
//         },
//       },
//       data,
//     };
//   }, [data, LegendLabels, ChartTooltip, themeValues]);

//   useEffect(() => {
//     let myChart = null;
//     if (chartContainer && chartContainer.current) {
//       Chart.register(...registerables);
//       myChart = new Chart(chartContainer.current, config);
//     }
//     return () => {
//       if (myChart) {
//         myChart.destroy();
//       }
//     };
//   }, [config]);

//   return <canvas ref={chartContainer} />;
// };

// export default React.memo(TopCustomers);


/* eslint-disable no-underscore-dangle,no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fTopCustomers } from './ChartSlice';

const TopCustomers = () => {
  const dispatch = useDispatch();
  const { themeValues } = useSelector((state) => state.settings);
  const { topCustomers , topCustomersStatus , topCustomersError } = useSelector((state) => state.chart);
  const chartContainer = useRef(null);

      useEffect(() => {
        dispatch(fTopCustomers());

    }, [dispatch]);


  const LegendLabels = React.useMemo(() => {
    return {
      font: {
        size: 14,
        family: themeValues.font,
      },
      padding: 20,
      usePointStyle: true,
      boxWidth: 10,
    };
  }, [themeValues]);
  const ChartTooltip = React.useMemo(() => {
    return {
      enabled: true,
      position: 'nearest',
      backgroundColor: themeValues.foreground,
      titleColor: themeValues.primary,
      titleFont: themeValues.font,
      bodyColor: themeValues.body,
      bodyFont: themeValues.font,
      bodySpacing: 10,
      padding: 15,
      borderColor: themeValues.separator,
      borderWidth: 1,
      cornerRadius: parseInt(themeValues.borderRadiusMd, 10),
      displayColors: false,
      intersect: true,
      mode: 'point',
    };
  }, [themeValues , topCustomers]);

  const data = React.useMemo(() => {
    return {
      labels: topCustomers?.map(d => d?.username),
      datasets: [
        {
          label: 'Bookings Count',
          borderColor: themeValues.primary,
          backgroundColor: `rgba(${themeValues.primaryrgb},0.1)`,
          data: topCustomers?.map(d => d?.bookingCount),
        },
      ],
    };
  }, [themeValues , topCustomers]);
  const config = React.useMemo(() => {
    return {
      type: 'bar',
      options: {
        elements: {
          bar: {
            borderWidth: 1.5,
            borderRadius: parseInt(themeValues.borderRadiusMd, 10),
            borderSkipped: false,
          },
        },
        plugins: {
          crosshair: false,
          datalabels: false,
          legend: {
            position: 'bottom',
            labels: LegendLabels,
          },
          tooltip: ChartTooltip,
          streaming: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 1,
            max: 10,
            grid: {
              display: true,
              lineWidth: 1,
              color: themeValues.separatorLight,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 100,
              padding: 8,
              fontColor: themeValues.alternate,
            },
          },
          x: {
            grid: { display: false, drawBorder: false },
          },
        },
      },
      data,
    };
  }, [data, LegendLabels, ChartTooltip, themeValues]);

  useEffect(() => {
    let myChart = null;
    if (chartContainer && chartContainer.current) {
      Chart.register(...registerables);
      myChart = new Chart(chartContainer.current, config);
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [config]);

  return <canvas ref={chartContainer} />;
};

export default React.memo(TopCustomers);

