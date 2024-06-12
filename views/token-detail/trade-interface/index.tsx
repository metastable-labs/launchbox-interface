import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import { LBButton, LBClickAnimation } from '@/components';

const tabs = ['buy', 'sell'];

const TradeInterface: React.FC<ITradeInterface> = ({ balance, tokenImageURL, tokenSymbol }) => {
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<number>(0);

  const balancePartitions = [
    { text: '10%', onClick: () => setAmount(balance * 0.1) },
    { text: '25%', onClick: () => setAmount(balance * 0.25) },
    { text: '50%', onClick: () => setAmount(balance * 0.5) },
    { text: '100%', onClick: () => setAmount(balance) },
  ];

  const info = [
    { title: "You'll get", value: `12 ETH` },
    { title: 'Network fee', value: `0.0046 ETH`, secondaryValue: `$0.03` },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tab, amount);
  };

  return (
    <form onSubmit={onSubmit} className="min-w-[335px] h-fit p-6 flex flex-col gap-6 rounded-base border border-primary-50 bg-white">
      <div className="p-1 self-stretch flex gap-1 bg-primary-2700 rounded-xl">
        {tabs.map((text) => (
          <div
            key={text}
            className={classNames(
              'p-1 flex-1 flex items-center justify-center rounded-lg text-[15px] leading-[24px] tracking-[-0.075px] font-semibold cursor-pointer transition-colors duration-300 capitalize',
              {
                'text-primary-2800 rounded-lg bg-primary-2850 shadow-trade-tab': text === tab,
                'text-primary-2750': text !== tab,
              },
            )}
            onClick={() => setTab(text as 'buy' | 'sell')}>
            {text}
          </div>
        ))}
      </div>

      <div className="self-stretch flex flex-col gap-3.5">
        <div className="p-4 self-stretch flex items-center justify-between bg-primary-2500 rounded-base border border-primary-1200">
          <input
            type="number"
            className="bg-transparent outline-none text-primary-150 text-[24px] leading-[34.8px] max-w-[50%] font-medium"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />

          <div className="flex flex-col items-end justify-center gap-1.5">
            <div className="px-3 py-1.5 bg-white flex items-center justify-between gap-3 rounded-base">
              <Image src={tokenImageURL} alt="token" width={500} height={500} className="w-5 h-5 object-cover" />
              <span className="text-primary-2800 font-semibold text-[15px] leading-[24px] tracking-[-0.075px]">{tokenSymbol}</span>
            </div>

            <p className="text-primary-250 text-[12px] leading-[17.4px] font-medium whitespace-nowrap">
              Balance: {balance.toLocaleString()} {tokenSymbol}
            </p>
          </div>
        </div>

        <div className="self-stretch flex-wrap flex items-center content-center gap-[9px]">
          {balancePartitions.map(({ text, onClick }, index) => (
            <LBClickAnimation key={index} className="px-[5px] py-1 bg-primary-200 text-primary-250 font-medium text-[12px] leading-[18.6px] rounded-[3px] flex-1 text-center" onClick={onClick}>
              {text}
            </LBClickAnimation>
          ))}
        </div>
      </div>

      <div className="py-3 flex flex-col gap-3 items-stretch rounded-lg">
        {info.map(({ title, value, secondaryValue }, index) => (
          <div key={index} className="flex items-center justify-between gap-2 text-primary-250 text-sm">
            <span>{title}</span>

            <p className="font-medium">
              {secondaryValue && (
                <>
                  <span className="text-primary-750">{secondaryValue}</span>
                  &ensp;
                </>
              )}
              {value}
            </p>
          </div>
        ))}
      </div>

      <LBButton variant="plainAlt" text={tab} type="submit" network={tab === 'buy' ? 'base' : 'optimism'} />
    </form>
  );
};

export default TradeInterface;
