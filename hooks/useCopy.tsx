import { useState } from 'react';

const useCopy = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 5000);
  };

  return { handleCopy, hasCopied };
};

export default useCopy;
