import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { IDistributionCard, ITokenomics } from "./types";
import useScreenDetect from "@/hooks/useScreenDetect";

ChartJS.register(ArcElement, Tooltip, Legend);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomColors = (numColors: number) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(getRandomColor());
  }
  return colors;
};

const DistributionCard = ({ title, color, percentage }: IDistributionCard) => {
  return (
    <div className="p-[8.49px] flex items-start gap-2 bg-primary-1750 rounded-[6.37px] border-[0.531px] border-primary-200 shadow-distribution-card-shadow min-w-full lg:min-w-[200px]">
      <div className="pt-2">
        <motion.div
          animate={{ backgroundColor: color }}
          className="w-5 h-5 rounded-full"
        />
      </div>

      <div className="flex flex-col items-start justify-center gap-3 text-primary-150">
        <span className="text-[20px] leading-[30px] tracking-[-0.22px] lg:text-[24px] lg:leading-[36px] lg:tracking-[-0.264px] font-medium">
          {title}
        </span>
        <span className="text-base tracking-[-0.176px]">{percentage}%</span>
      </div>
    </div>
  );
};

const Tokenomics = ({
  tokenDistributions,
  tokenSymbol,
  tokenTotalSupply,
}: ITokenomics) => {
  const colors = generateRandomColors(tokenDistributions.length);
  const { isMobile, isTablet } = useScreenDetect();

  const data = {
    labels: tokenDistributions.map((d) => d.title),
    datasets: [
      {
        label: `${tokenSymbol} Distribution`,
        data: tokenDistributions.map((d) => d.percentage),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
        borderWidth: 6,
        hoverBorderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: isMobile ? 100 : isTablet ? 95 : 125,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:min-h-[587.21px] w-full">
      <div className="p-4 bg-white self-stretch shadow-tokenomics-shadow w-full lg:w-1/2 flex items-center justify-center min-h-[444.6px] lg:min-h-full">
        <div className="w-[300px] h-[300px] lg:w-[403.6px] lg:h-[403.6px] relative z-10">
          <Doughnut data={data} options={options} />

          <div className="absolute -z-10 w-full h-full top-0 right-0 flex flex-col gap-[10.41px] items-center justify-center">
            <span className="text-primary-250 text-[10.406px] leading-[8.381px] tracking-[-0.114px] lg:text-[14px] lg:leading-[11.275px] lg:tracking-[-0.154px]">
              Total Supply
            </span>
            <span className="text-[17.839px] leading-[26.758px] text-primary-1800 lg:text-[24px] lg:leading-[36px] font-medium text-center">
              {tokenSymbol} {tokenTotalSupply.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white self-stretch shadow-tokenomics-shadow w-full lg:w-1/2 flex items-center justify-center lg:min-h-full">
        <div className="flex items-stretch lg:items-center justify-start gap-[10.62px] flex-wrap w-full lg:max-w-[414px] my-14 lg:my-0">
          {tokenDistributions.map(({ percentage, title }, index) => (
            <DistributionCard
              color={colors[index]}
              key={index}
              percentage={percentage}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
