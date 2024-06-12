import Image from 'next/image';
import { NumericFormat, OnValueChange } from 'react-number-format';

import { LBModal, LBClickAnimation, LBButton } from '@/components';
import { IFirstBuyModal } from '../types';
import { AlternatingArrowIcon, ETHIcon, ExchangeIcon } from '@/public/icons';

const balance = 24.64;

const FirstBuyModal: React.FC<IFirstBuyModal> = ({ show, tokenLogo, tokenSymbol, firstBuyAmount, setFirstBuyAmount, firstBuyTokenAmount, setFirstBuyTokenAmount }) => {
  const rateValue = 40000;

  const balancePartitions = [
    { text: '10%', onClick: () => setFirstBuyAmount(balance * 0.1) },
    { text: '25%', onClick: () => setFirstBuyAmount(balance * 0.25) },
    { text: '50%', onClick: () => setFirstBuyAmount(balance * 0.5) },
    { text: '100%', onClick: () => setFirstBuyAmount(balance) },
  ];

  const handleAmountChange: OnValueChange = ({ floatValue }) => setFirstBuyAmount(floatValue || 0);

  const handleTokenAmountChange: OnValueChange = ({ floatValue }) => setFirstBuyTokenAmount(floatValue || 0);

  return (
    <LBModal show={show} hasClose={false} title="First Buy">
      <div className="flex flex-col gap-6">
        <div className="self-stretch flex flex-col gap-3.5">
          <div className="p-4 self-stretch flex items-center justify-between bg-primary-2500 rounded-base border border-primary-1200">
            <NumericFormat
              value={firstBuyAmount}
              className="bg-transparent outline-none text-primary-150 text-[24px] leading-[34.8px] max-w-[50%] font-medium"
              placeholder="Amount"
              thousandSeparator=","
              allowNegative={false}
              onValueChange={handleAmountChange}
            />
            <div className="flex flex-col items-end justify-center gap-1.5">
              <div className="px-3 py-1.5 bg-white flex items-center justify-between gap-3 rounded-base">
                <ETHIcon />
                <span className="text-primary-2800 font-semibold text-[15px] leading-[24px] tracking-[-0.075px]">ETH</span>
              </div>

              <p className="text-primary-250 text-[12px] leading-[17.4px] font-medium whitespace-nowrap">Balance: {balance.toLocaleString()} ETH</p>
            </div>
          </div>

          <div className="self-stretch flex-wrap flex items-center content-center gap-8">
            {balancePartitions.map(({ text, onClick }, index) => (
              <LBClickAnimation key={index} className="px-[5px] py-1 bg-primary-200 text-primary-250 font-medium text-[12px] leading-[18.6px] rounded-[3px] flex-1 text-center" onClick={onClick}>
                {text}
              </LBClickAnimation>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center self-stretch">
          <ExchangeIcon />
        </div>

        <div className="self-stretch flex flex-col gap-3.5">
          <div className="p-4 self-stretch flex items-center justify-between bg-primary-2500 rounded-base border border-primary-1200">
            <NumericFormat
              value={firstBuyTokenAmount}
              className="bg-transparent outline-none text-primary-150 text-[24px] leading-[34.8px] max-w-[50%] font-medium"
              placeholder="Amount"
              thousandSeparator=","
              allowNegative={false}
              onValueChange={handleTokenAmountChange}
            />

            <div className="px-3 py-1.5 bg-white flex items-center justify-between gap-3 rounded-base">
              <Image src={tokenLogo} alt="token-logo" width={500} height={500} className="w-5 h-5 object-cover" />
              <span className="text-primary-2800 font-semibold text-[15px] leading-[24px] tracking-[-0.075px] uppercase">{tokenSymbol}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-primary-250 text-sm">
          <span>Rate</span>

          <div className="flex items-center justify-center gap-2">
            <span>1 ETH = {rateValue.toLocaleString()} SAAT</span>
            <AlternatingArrowIcon />
          </div>
        </div>

        <LBButton text="Continue" fullWidth onClick={() => {}} type="submit" variant="plain" />

        <p className="px-6 py-3 self-stretch rounded-xl bg-primary-300 text-primary-1250 text-[14px] leading-[24px]">Helpful informative text here</p>
      </div>
    </LBModal>
  );
};

export default FirstBuyModal;
