import { useState } from 'react';
import { toast } from 'react-toastify';

const useCopy = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);

    toast('Copied url', {
      type: 'info',
      className: 'w-[100px]',
    });

    setTimeout(() => {
      setHasCopied(false);
    }, 5000);
  };

  return { handleCopy, hasCopied };
};

export default useCopy;
