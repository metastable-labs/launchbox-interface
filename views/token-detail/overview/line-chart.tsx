import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, TimeScale, ChartOptions, Filler, TimeUnit } from 'chart.js';
import 'chartjs-adapter-date-fns';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import moment from 'moment';
import { ILiquidityChart, Period } from './types';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, TimeScale, Filler, crosshairPlugin);

const getOptions = (period: Period, liquidityData: { date: Date; value: number }[]): any => {
  let unit: TimeUnit;
  let displayFormats: any;
  let stepSizeY: number;
  let stepSizeX: number;
  let minDate: Date;
  let maxDate: Date;

  switch (period) {
    case '1h':
      unit = 'minute';
      displayFormats = { minute: 'HH:mm' };
      stepSizeX = 5;
      stepSizeY = calculateStepSizeY(liquidityData);
      minDate = moment().subtract(1, 'hour').toDate();
      maxDate = moment().toDate();
      break;
    case '24h':
      unit = 'hour';
      displayFormats = { hour: 'HH:mm' };
      stepSizeX = 2;
      stepSizeY = calculateStepSizeY(liquidityData);
      minDate = moment().subtract(24, 'hour').toDate();
      maxDate = moment().toDate();
      break;
    case '1w':
      unit = 'day';
      displayFormats = { day: 'EEE' };
      stepSizeX = 1;
      stepSizeY = calculateStepSizeY(liquidityData);
      minDate = moment().subtract(1, 'week').toDate();
      maxDate = moment().toDate();
      break;
    case '1m':
      unit = 'week';
      displayFormats = { week: 'MMM d' };
      stepSizeX = 1;
      stepSizeY = calculateStepSizeY(liquidityData);
      minDate = moment().subtract(1, 'month').toDate();
      maxDate = moment().toDate();
      break;
    default:
      unit = 'week';
      displayFormats = { day: 'MMM d' };
      stepSizeX = 1;
      stepSizeY = calculateStepSizeY(liquidityData);
      minDate = moment().subtract(1, 'week').toDate();
      maxDate = moment().toDate();
  }

  return {
    scales: {
      y: {
        display: true,
        position: 'right',
        grid: {
          display: true,
          tickColor: 'rgba(0, 0, 0, 0)',
          color: '#F6F8FA',
        },
        ticks: {
          display: true,
          stepSize: stepSizeY,
        },
        border: {
          display: false,
        },
      },
      x: {
        type: 'time',
        time: {
          unit: unit,
          displayFormats: displayFormats,
        },
        ticks: {
          stepSize: stepSizeX,
        },
        grid: {
          display: false,
        },
        min: minDate,
        max: maxDate,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        axis: 'x',
        callbacks: {
          title: function (context: any) {
            const rawDate = context[0].label;
            return rawDate;
          },
          label: function (context: any) {
            const value = (context.raw as number).toFixed(2);
            return `$${value}`;
          },
        },
      },
      crosshair: {
        line: {
          color: 'rgb(200 200 200)',
          width: 2,
        },
      },
    },
    maintainAspectRatio: false,
  };
};

const calculateStepSizeY = (liquidityData: { date: Date; value: number }[]): number => {
  const minValue = Math.min(...liquidityData.map((d) => d.value));
  const maxValue = Math.max(...liquidityData.map((d) => d.value));
  const valueRange = maxValue - minValue;
  const stepSizeFactor = Math.pow(10, Math.floor(Math.log10(valueRange)) - 1);
  return Math.ceil(valueRange / 4 / stepSizeFactor) * stepSizeFactor;
};

const LiquidityLineChart: React.FC<ILiquidityChart> = ({ liquidityData, period }) => {
  const chartData = {
    labels: liquidityData.map((d) => d.date),
    datasets: [
      {
        data: liquidityData.map((d) => d.value),
        borderColor: '#0C68E9',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        backgroundColor: 'rgba(156, 197, 255, 0.05)',
      },
    ],
  };

  const options = getOptions(period, liquidityData);

  return <Line data={chartData} options={{ ...options, responsive: true }} width={'100%'} />;
};

export default LiquidityLineChart;
