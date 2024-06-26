export const getTokenLink = (id: number, hash?: string): { title: string; url: string } => {
  if (!hash) return { title: '', url: '' };

  if (id === 1) {
    return { title: 'etherscan', url: `https://etherscan.io/tx/${hash}` };
  }

  if (id === 8453) {
    return { title: 'basescan', url: `https://basescan.org/tx/${hash}` };
  }

  if (id === 34443) {
    return { title: 'modescan', url: `https://modescan.io/tx/${hash}` };
  }

  if (id === 10) {
    return { title: 'optimisticscan', url: `https://optimistic.etherscan.io//tx/${hash}` };
  }

  return { title: '', url: '' };
};

export const formatAmount = (amount?: number | string, decimals = 4): number => {
  if (!amount) return 0;

  const factor = Math.pow(10, decimals);
  const truncatedValue = Math.floor(Number(amount) * factor) / factor;
  return truncatedValue;
};

export const formatCurrency = (amount?: number | string, decimals = 4) => {
  if (!amount) return { whole: '0', decimal: '00' };

  const [whole, decimal] = formatAmount(amount, decimals).toString().split('.');
  return { whole, decimal };
};

export const formatNumber = (num: number): string => {
  const formatWithPrecision = (value: number) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2).replace(/\.?0+$/, '');
  };

  if (num >= 1e9) {
    return formatWithPrecision(num / 1e9) + 'b';
  }
  if (num >= 1e6) {
    return formatWithPrecision(num / 1e6) + 'm';
  }
  if (num >= 1e3) {
    return formatWithPrecision(num / 1e3) + 'k';
  }
  return num?.toString();
};
