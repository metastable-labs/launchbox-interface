import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { NumericFormat, OnValueChange } from 'react-number-format';
import { getBalance } from '@wagmi/core';
import { formatEther } from 'viem';

import { LBButton, LBClickAnimation } from '@/components';
import useTokenActions from '@/store/token/actions';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { ETHIcon, InfoIcon } from '@/public/icons';
import { wagmiConfig } from '@/config/rainbow/rainbowkit';
import { formatAmount } from '@/utils/helpers';
import { ILBTradeInterface } from './types';

const tabs = ['buy', 'sell'];

function truncateToDecimals(num: number) {
  const factor = Math.pow(10, 5);
  return Math.floor(num * factor) / factor;
}

const LBTradeInterface = ({ standAlone = true, token }: ILBTradeInterface) => {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const { buyTokens, calculateSellTokenAmount, calculateBuyTokenAmount, sellTokens } = useTokenActions();
  const { tokenState } = useSystemFunctions();

  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<number>();
  const [valueToGet, setValueToGet] = useState<number>();
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const balance = tab === 'buy' ? ethBalance : tokenBalance;

  const invalidAmount = (tab === 'buy' && Number(amount) > ethBalance) || (tab === 'sell' && Number(amount) > tokenBalance);

  const balancePartitions = [
    { text: '10%', onClick: () => setAmount(truncateToDecimals(balance * 0.1)) },
    { text: '25%', onClick: () => setAmount(truncateToDecimals(balance * 0.25)) },
    { text: '50%', onClick: () => setAmount(truncateToDecimals(balance * 0.5)) },
    { text: '100%', onClick: () => setAmount(truncateToDecimals(balance)) },
  ];

  const tokenToGet = tab === 'buy' ? token?.token_symbol : 'ETH';
  const decimal = tab === 'buy' ? 4 : 10;
  const amountToGet = formatAmount(valueToGet, decimal).toLocaleString();
  const info = [{ title: "You'll get", value: `${amountToGet} ${tokenToGet}` }];

  const tokenSymbol = tab === 'buy' ? 'ETH' : token?.token_symbol;
  const tokenLogo = tab === 'buy' ? <ETHIcon height={20} width={20} /> : <Image src={token?.token_logo_url || ''} alt="token" width={500} height={500} className="w-5 h-5 object-cover" />;

  const handleAmountChange: OnValueChange = ({ floatValue }) => {
    console.log(floatValue);
    setAmount(floatValue || 0);
  };

  const handleGetBalance = async () => {
    const ethResponse = await getBalance(wagmiConfig, {
      address: address!,
      unit: 'ether',
    });

    const ethBalance = formatEther(ethResponse.value);
    const formattedEthValue = truncateToDecimals(Number(ethBalance));

    setEthBalance(formattedEthValue);

    const tokenBalance = await getBalance(wagmiConfig, {
      address: address!,
      token: token?.token_address,
    });

    const formattedBalanceValue = truncateToDecimals(Number(tokenBalance.formatted));

    setTokenBalance(formattedBalanceValue);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !token?.id) return;

    if (!isConnected && !address && openConnectModal) return openConnectModal();
    if (tab === 'buy') {
      return buyTokens(token?.exchange_address, amount);
    }

    return sellTokens(token?.exchange_address, token.token_address, amount);
  };

  useEffect(() => {
    if (!amount) {
      setValueToGet(undefined);
      return;
    }

    if (tab === 'buy') {
      calculateBuyTokenAmount(token?.exchange_address!, amount).then((val) => setValueToGet(val));
    } else {
      calculateSellTokenAmount(token?.exchange_address!, amount).then((val) => setValueToGet(val));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    if (!address) return;

    handleGetBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <form onSubmit={onSubmit} className={classNames('h-fit flex flex-col gap-6', { 'p-6 rounded-base border border-primary-50 bg-white': standAlone, 'max-w-80 md:max-w-[343px]': !standAlone })}>
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
              onClick={() => {
                setTab(text as 'buy' | 'sell');
                setAmount(0);
                setValueToGet(undefined);
              }}>
              {text}
            </div>
          ))}
        </div>

        <div className="self-stretch flex flex-col gap-3.5">
          <div className="p-4 self-stretch flex items-center justify-between bg-primary-2500 rounded-base border border-primary-1200">
            <NumericFormat
              value={amount}
              className="bg-transparent outline-none text-primary-150 text-[24px] leading-[34.8px] max-w-[50%] font-medium"
              placeholder="Amount"
              thousandSeparator=","
              allowNegative={false}
              onValueChange={handleAmountChange}
            />

            <div className="flex flex-col items-end justify-center gap-1.5">
              <div className="px-3 py-1.5 bg-white flex items-center justify-between gap-3 rounded-base">
                {tokenLogo}
                <span className="text-primary-2800 font-semibold text-[15px] leading-[24px] tracking-[-0.075px]">{tokenSymbol}</span>
              </div>

              <p className="text-primary-250 text-[12px] leading-[17.4px] font-medium whitespace-nowrap">
                Balance: {balance.toLocaleString('en', { maximumFractionDigits: 5 })} {tokenSymbol}
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

          {valueToGet && (
            <div className="py-3 flex flex-col gap-3 items-stretch rounded-lg">
              {info.map(({ title, value }, index) => (
                <div key={index} className="flex items-center justify-between gap-2 text-primary-250 text-sm">
                  <span>{title}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}

          <LBButton loading={tokenState.loadingBuy} disabled={!amount || invalidAmount} variant="plainAlt" text={tab} type="submit" tradeType={tab} />
        </div>
      </form>

      <AnimatePresence>
        {invalidAmount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames('mt-6 bg-primary-2950 p-2 flex items-center rounded-[10px] w-full', { 'absolute left-0 top-[96%]': !standAlone })}>
            <div className="flex items-center justify-center p-1">
              <InfoIcon width={24} height={24} color="#6E330C" />
            </div>

            <p className="text-primary-3000 text-[14px] leading-[24px] max-w-[348.7px]">{`You don't have enough ${tab === 'buy' ? 'ETH' : token?.token_symbol}`}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LBTradeInterface;
