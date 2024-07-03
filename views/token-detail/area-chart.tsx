import React, { useState } from 'react';
import moment from 'moment';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Area } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

import { IAreaChart, Period } from './types';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatPrice } from '@/utils/helpers';

const formatXAxis = (timestamp: number, period: Period) => {
  const date = moment.unix(timestamp);
  switch (period) {
    case '1h':
      return date.format('HH:mm');
    case '24h':
      return date.format('HH:mm');
    case '1w':
      return date.format('ddd');
    case '1m':
      return date.format('MMM DD');
    default:
      return date.format('MMM DD');
  }
};
const formatYAxisTick = (tickValue: number) => {
  const { value } = formatPrice(tickValue);
  return value;
};

const LoadingStroke = () => (
  <svg className="animate-pulse" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
    <path fill="none" stroke="#EFEFEF" strokeWidth="0.4" d="M 0 10 L 10 15 Q 20 20 30 15 T 40 10 Q 50 5 60 15 T 70 10 Q 80 5 90 15 L 100 10" />
  </svg>
);

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const value = Number(payload[0].value || 0);
  const { whole, decimal } = formatPrice(value);

  const parsedDate = moment.unix(Number(label));

  const day = parsedDate.format('M/D/YY');
  const time = parsedDate.format('h:mma');

  return (
    <div className="flex flex-col items-start gap-0.5 bg-primary-2850 border border-primary-3550 p-5 rounded-xl shadow-tooltip">
      <div className="w-full flex items-center justify-between gap-10 text-xs text-primary-2750 font-Aeonik font-medium uppercase">
        <span>{day}</span>
        <span>{time}</span>
      </div>

      <p className="font-Clash-Display text-2xl tracking-[-0.72px] font-medium">
        $<span>{whole}</span>.<span className="text-primary-750">{decimal}</span>
      </p>
    </div>
  );
};

const AreaChartComponent: React.FC<IAreaChart> = ({ variant = 'primary', period = '1w' }) => {
  const { tokenState } = useSystemFunctions();
  const { analytics, loadingAnalytics } = tokenState;

  const data = analytics?.dataPoints.map((item) => ({ date: item.date, value: item.price, timestamp: item.timestamp }));

  if (loadingAnalytics) {
    return (
      <div className="absolute inset-5 flex items-center justify-center z-50">
        <LoadingStroke />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data?.map((d) => ({ ...d, value: parseFloat(d.value) }))}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(1, 133, 88, 0.13)" />
            <stop offset="100%" stopColor="rgba(56, 199, 147, 0)" />
          </linearGradient>
        </defs>
        <XAxis dataKey="timestamp" tick={{ fill: 'rgba(111, 118, 126, 0.75)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(tick) => formatXAxis(tick, period)} />
        {variant === 'primary' && <YAxis tick={{ fontSize: 12, fill: 'rgba(111, 118, 126, 0.75)' }} axisLine={false} tickLine={false} orientation="right" mirror tickFormatter={formatYAxisTick} />}
        <CartesianGrid stroke="#F6F8FA" vertical={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#EFEFEF', strokeWidth: 3 }} labelFormatter={(label) => label} />
        <Area type="monotone" dataKey="value" stroke="#018558" fill="url(#colorValue)" strokeWidth={2} clipPath="none" activeDot={{ r: 6.5, stroke: '#fff', strokeWidth: 3 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
