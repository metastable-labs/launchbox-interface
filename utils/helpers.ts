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

export const formatAmount = (amount: number, decimals = 4): number => {
  const factor = Math.pow(10, decimals);
  const truncatedValue = Math.floor(amount * factor) / factor;
  return truncatedValue;
};
