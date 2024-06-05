import CustomizingPaper from "./paper";
import { ITokenomics } from "./types";
import { PlusAltIcon, TokenomicsIcon } from "@/public/icons";
import { LBClickAnimation } from "@/components";

interface IDistributionInput {
  title: string;
  percentage: number;
  handleTitleChange: (title: string) => void;
  handlePercentageChange: (percentage: number) => void;
}

const DistributionInput = ({
  percentage,
  title,
  handlePercentageChange,
  handleTitleChange,
}: IDistributionInput) => (
  <div className="flex items-center justify-center gap-2 self-stretch">
    <input
      type="text"
      className="self-stretch rounded-lg border border-primary-1950 shadow-table-cta bg-white px-3 py-2 w-full outline-none"
      placeholder="Team"
      value={title}
      onChange={(e) => handleTitleChange(e.target.value)}
    />

    <div className="w-[106px] h-[40px] shrink border border-primary-1950 flex items-center justify-center rounded-lg bg-white">
      <input
        type="number"
        className="self-stretch shadow-table-cta px-3 py-2 w-[62px] h-full outline-none rounded-lg"
        placeholder="10%"
        value={percentage}
        onChange={(e) => handlePercentageChange(Number(e.target.value))}
      />

      <div className="px-3.5 flex items-center justify-center h-full w-11 text-sm text-primary-2000 font-semibold border-l border-primary-1950">
        %
      </div>
    </div>
  </div>
);

const Tokenomics = ({
  onClick,
  handleChange,
  isActive,
  tokenDistributions,
  tokenTotalSupply,
}: ITokenomics) => {
  const handleNewDistribution = () => {
    handleChange("tokenDistributions", [
      ...tokenDistributions,
      { title: "", percentage: 0 },
    ]);
  };
  return (
    <div className="px-4 rounded-lg border border-primary-50 bg-white flex flex-col self-stretch gap-2">
      <CustomizingPaper
        icon={<TokenomicsIcon />}
        isActive={isActive}
        title="Tokenomics"
        onClick={() => onClick("tokenomics")}
      />

      <div className="flex flex-col items-stretch justify-center gap-5 self-stretch pb-8">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="token-supply"
            className="text-primary-2000 text-sm font-medium"
          >
            Total token supply
          </label>

          <input
            id="token-supply"
            type="number"
            className="self-stretch rounded-lg border border-primary-1950 shadow-table-cta bg-primary-2250 px-3 py-2 outline-none"
            placeholder="10,000,000"
            onChange={(e) =>
              handleChange("tokenTotalSupply", Number(e.target.value))
            }
            value={tokenTotalSupply}
          />
        </div>

        <h1 className="pb-4 border-b-[0.5px] border-b-primary-50 text-primary-2000 text-sm font-semibold">
          Token distribution
        </h1>

        <div className="flex flex-col items-stretch gap-4">
          {tokenDistributions?.map((distribution, index) => (
            <DistributionInput
              key={index}
              title={distribution.title}
              percentage={distribution.percentage}
              handleTitleChange={(title) =>
                handleChange("tokenDistributions", [
                  ...tokenDistributions.slice(0, index),
                  { ...distribution, title },
                  ...tokenDistributions.slice(index + 1),
                ])
              }
              handlePercentageChange={(percentage) =>
                handleChange("tokenDistributions", [
                  ...tokenDistributions.slice(0, index),
                  { ...distribution, percentage },
                  ...tokenDistributions.slice(index + 1),
                ])
              }
            />
          ))}

          <div className="flex items-center justify-start">
            <LBClickAnimation
              onClick={handleNewDistribution}
              className="flex items-center justify-center gap-1"
            >
              <PlusAltIcon />
              <span className="text-sm font-semibold text-primary-2300">
                Add distribution unit
              </span>
            </LBClickAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
