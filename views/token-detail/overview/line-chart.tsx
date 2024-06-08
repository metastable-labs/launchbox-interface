import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  TimeScale,
  TooltipItem,
  ChartOptions,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import moment from "moment";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  TimeScale,
  Filler
);

const options: ChartOptions<"line"> = {
  scales: {
    y: {
      display: false,
    },
    x: {
      type: "time",
      time: {
        unit: "month",
        displayFormats: {
          month: "MMM",
        },
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (context: any) {
          const rawDate = context.label;
          const formattedDate = moment(rawDate).format("M/D/YYYY h:mma");
          return formattedDate;
        },
        label: function (context: TooltipItem<"line">) {
          const value = (context.raw as number).toFixed(2);
          return `$${value}`;
        },
      },
      time: {
        tooltipFormat: "M/D/YYYY",
      },
    } as any,
  },
  maintainAspectRatio: false,
};

const LiquidityLineChart: React.FC<ILiquidityChart> = ({ liquidityData }) => {
  const chartData = {
    labels: liquidityData.map((d) => d.date),
    datasets: [
      {
        data: liquidityData.map((d) => d.value),
        borderColor: "#0C68E9",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        backgroundColor: "rgba(156, 197, 255, 0.05)",
      },
    ],
  };

  return <Line data={chartData} options={options} width={"100%"} />;
};

export default LiquidityLineChart;
