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

export function convertToSubscript(number: number): string {
  const subscriptMap: { [key: string]: string } = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
  };

  return String(number)
    .split('')
    .map((digit) => subscriptMap[digit])
    .join('');
}

export function formatPrice(number: number) {
  let numberString = number.toFixed(20);
  numberString = numberString.replace(/0+$/, '');

  const significantIndex = numberString.split('').findIndex((char) => char !== '0' && char !== '.');
  const leadingZerosCount = significantIndex - numberString.indexOf('.') - 1;

  if (number < 1) {
    if (leadingZerosCount >= 5) {
      const subscript = convertToSubscript(leadingZerosCount);
      const [wholePart, decimalPart] = numberString.split('.');
      let significantDecimal = decimalPart.slice(leadingZerosCount);

      if (significantDecimal.length > 3) {
        significantDecimal = Math.round(parseFloat(`0.${significantDecimal}`) * 1000).toString();
      }

      const formattedDecimal = `0${subscript}${significantDecimal}`;

      return {
        whole: wholePart,
        decimal: formattedDecimal,
        value: `${wholePart}.${formattedDecimal}`,
      };
    }

    if (leadingZerosCount < 5 && leadingZerosCount > 0) {
      const [wholePart, decimalPart] = numberString.split('.');
      const leadingZeros = decimalPart.slice(0, leadingZerosCount);
      let significantDecimal = decimalPart.slice(leadingZerosCount);

      if (significantDecimal.length > 3) {
        significantDecimal = Math.round(parseFloat(`0.${significantDecimal}`) * 1000).toString();
      }

      const formattedDecimal = `${leadingZeros}${significantDecimal}`;

      return {
        whole: wholePart,
        decimal: formattedDecimal,
        value: `${wholePart}.${formattedDecimal}`,
      };
    }

    if (leadingZerosCount <= 0) {
      const [wholePart, decimalPart] = numberString.split('.');
      let significantDecimal = decimalPart.slice(0, 7).replace(/0+$/, '');

      return {
        whole: wholePart,
        decimal: significantDecimal,
        value: `${wholePart}.${significantDecimal}`,
      };
    }
  } else {
    const [wholePart, decimalPart] = numberString.split('.');
    let significantDecimal = (decimalPart || '0').slice(0, 2).padEnd(2, '0');

    return {
      whole: wholePart,
      decimal: significantDecimal,
      value: `${wholePart}.${significantDecimal}`,
    };
  }

  return {
    whole: '0',
    decimal: '00',
    value: `0.00`,
  };
}
