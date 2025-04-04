import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch, useSelector } from 'react-redux';
import { fBookingsOverTime } from './ChartSlice';

const BookingsOverTime = () => {
  const dispatch = useDispatch();
  const { themeValues } = useSelector((state) => state.settings);
  const { bookingsOverTime , bookingsOverTimeStatus , bookingsOverTimeError } = useSelector((state) => state.chart);
  const chartContainer = useRef(null);
  const [chartData, setChartData] = useState([]);

  // 📥 Fetch bookings over time from backend
  useEffect(() => {
    dispatch(fBookingsOverTime());
  }, [dispatch]);

  // 🧠 Extracted values for Chart.js
  const data = useMemo(() => {
    return {
      labels: bookingsOverTime?.map(d => d.date),
      datasets: [
        {
          label: 'Bookings',
          data: bookingsOverTime?.map(d => d.count),
          fill: false,
          cubicInterpolationMode: 'monotone',
          borderColor: themeValues.primary,
          borderWidth: 2,
          pointBackgroundColor: themeValues.primary,
          pointBorderColor: themeValues.primary,
          pointHoverBackgroundColor: themeValues.primary,
          pointHoverBorderColor: themeValues.primary,
          pointRadius: 3,
          pointBorderWidth: 3,
        },
      ],
    };
  }, [bookingsOverTime, themeValues]);

  const ChartTooltipForCrosshair = useMemo(() => ({
    enabled: true,
    position: 'nearest',
    backgroundColor: themeValues.foreground,
    titleColor: themeValues.primary,
    titleFont: themeValues.font,
    bodySpacing: 10,
    bodyColor: themeValues.body,
    bodyFont: themeValues.font,
    padding: 15,
    cornerRadius: parseInt(themeValues.borderRadiusMd, 10),
    displayColors: false,
    borderColor: themeValues.separator,
    borderWidth: 1,
    intersect: false,
    mode: 'index',
  }), [themeValues , bookingsOverTime]);

  const Crosshair = useMemo(() => ({
    sync: { enabled: false },
    zoom: { enabled: false },
    line: {
      color: themeValues.separator,
      width: 1,
    }
  }), [themeValues , bookingsOverTime]);

  const config = useMemo(() => ({
    type: 'line',
    plugins: [CrosshairPlugin, ChartDataLabels],
    options: {
      layout: { padding: 0 },
      showLine: true,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        crosshair: Crosshair,
        datalabels: false,
        tooltip: ChartTooltipForCrosshair,
        legend: false,
        streaming: false,
      },
      scales: {
        y: {
          type: 'linear',
          grid: {
            display: true,
            lineWidth: 1,
            color: themeValues.separatorLight,
            drawBorder: false,
            drawTicks: true,
          },
          ticks: {
            padding: 8,
            stepSize: 5,
            color: themeValues.alternate,
          },
        },
        x: {
          type: 'category',
          grid: {
            display: false,
            drawTicks: true,
            drawBorder: false,
          },
          ticks: { color: themeValues.alternate },
        },
      },
    },
    data,
  }), [themeValues, data, ChartTooltipForCrosshair, Crosshair]);

  useEffect(() => {
    let myChart = null;
    if (chartContainer.current) {
      Chart.register(...registerables);
      myChart = new Chart(chartContainer.current, config);
    }
    return () => {
      if (myChart) myChart.destroy();
    };
  }, [config]);

  return <canvas ref={chartContainer} />;
};

export default React.memo(BookingsOverTime);