import { useChainId, useSwitchChain } from "wagmi";
import classNames from "classnames";

import { networks } from "@/config/rainbow/config";

const NetworkModal = ({ close }: { close: () => void }) => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const switchNetwork = (chainId: number) => {
    switchChain && switchChain({ chainId });

    close();
  };

  return (
    <div className="flex flex-col gap-[28px] min-w-[300px] md:min-w-80">
      <h1 className="text-[20px] leading-[30px] text-primary-400 text-left font-medium -mt-10">
        Select chain
      </h1>

      <div className="flex flex-col md:min-w-80 flex-1 items-stretch gap-8">
        {networks?.map(({ icon, variant, chainId: id }, index) => (
          <div
            key={index}
            onClick={() => switchNetwork(id)}
            className="flex items-center justify-between hover:bg-primary-200 transition-colors duration-300 cursor-pointer py-2 px-5 -mx-5"
          >
            <div className="flex items-center justify-center gap-2">
              {icon}{" "}
              <span className="capitalize text-[14px] leading-[21.7px] font-medium text-primary-150">
                {variant}
              </span>
            </div>

            <div
              className={classNames(
                "w-3 h-3 rounded-full transition-all duration-200",
                {
                  "bg-primary-450": chainId === id,
                }
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkModal;
