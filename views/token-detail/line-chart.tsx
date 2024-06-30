import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, TimeScale, ChartOptions, Filler, TimeUnit } from 'chart.js';
import 'chartjs-adapter-date-fns';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import moment from 'moment';
import { ILineChart, LineChartVariant, Period } from './types';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, TimeScale, Filler, crosshairPlugin);

const getOptions = (period: Period, data: { date: Date; value: number }[], variant?: LineChartVariant): any => {
  let unit: TimeUnit;
  let displayFormats: any;
  let stepSizeY: number;
  let stepSizeX: number;
  let minDate = data.length > 0 ? data[0].date : moment().toDate();
  let maxDate = data.length > 0 ? data[data.length - 1].date : moment().toDate();

  switch (period) {
    case '1h':
      unit = 'minute';
      displayFormats = { minute: 'HH:mm' };
      stepSizeX = 5;
      stepSizeY = calculateStepSizeY(data);
      minDate = moment().subtract(1, 'hour').toDate();
      maxDate = moment().toDate();
      break;
    case '24h':
      unit = 'hour';
      displayFormats = { hour: 'HH:mm' };
      stepSizeX = 2;
      stepSizeY = calculateStepSizeY(data);
      minDate = moment().subtract(24, 'hour').toDate();
      maxDate = moment().toDate();
      break;
    case '1w':
      unit = 'day';
      displayFormats = { day: 'EEE' };
      stepSizeX = 1;
      stepSizeY = calculateStepSizeY(data);
      minDate = moment().subtract(1, 'week').toDate();
      maxDate = moment().toDate();
      break;
    case '1m':
      unit = 'week';
      displayFormats = { week: 'MMM d' };
      stepSizeX = 1;
      stepSizeY = calculateStepSizeY(data);
      minDate = moment().subtract(1, 'month').toDate();
      maxDate = moment().toDate();
      break;
    default:
      unit = 'week';
      displayFormats = { day: 'MMM d' };
      stepSizeX = 1;
      stepSizeY = calculateStepSizeY(data);
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
        backgroundColor: '#FCFCFC',
        borderColor: '#EFEFEF',
        borderWidth: '1',
        titleColor: '#6F767E',
        titleFont: {
          size: variant === 'secondary' ? 10 : 12,
          weight: 'bold',
        },
        padding: variant === 'secondary' ? 14 : 20,
        bodyColor: '#868C98',
        bodyFont: {
          size: variant === 'secondary' ? 16 : 24,
          weight: 'bold',
        },
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          title: function (context: any) {
            const rawDate = context[0].label;
            const parsedDate = moment(rawDate, 'MMM DD, YYYY, h:mm:ss a');

            const formattedDate = parsedDate.format('M/D/YY      h:mma');
            return formattedDate.toUpperCase();
          },
          label: function (context: any) {
            const value = (context.raw as number).toFixed(2);
            return variant === 'secondary' ? `${Number(value).toLocaleString()} followers` : `$${value}`;
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

const calculateStepSizeY = (data: { date: Date; value: number }[]): number => {
  const minValue = Math.min(...data.map((d) => d.value));
  const maxValue = Math.max(...data.map((d) => d.value));
  const valueRange = maxValue - minValue;
  const stepSizeFactor = Math.pow(10, Math.floor(Math.log10(valueRange)) - 1);
  return Math.ceil(valueRange / 4 / stepSizeFactor) * stepSizeFactor;
};

const LineChart: React.FC<ILineChart> = ({ data, period, variant = 'primary' }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        data: data.map((d) => d.value),
        borderColor: '#0C68E9',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHitRadius: 50,
        fill: true,
        backgroundColor: 'rgba(156, 197, 255, 0.05)',
        pointBackgroundColor: '#0C68E9',
        pointBorderColor: '#fff',
        pointBorderWidth: 4,
      },
    ],
  };

  const options = getOptions(period, data, variant);

  if (variant === 'secondary') {
    options.scales.y.ticks.display = false;
  }

  return <Line data={chartData} options={{ ...options, responsive: true }} width={'100%'} />;
};

export default LineChart;
