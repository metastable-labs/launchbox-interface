import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { IClickTabs } from './types';

const ClickTabs = ({ tabTexts, tab, setTab }: IClickTabs) => {
  const [activeTab, setActiveTab] = useState<any>('');

  const onClick = (text: string) => {
    setTab(text);
    setActiveTab(text);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const activeIndex = tabTexts.indexOf(activeTab);
  const tabWidth = 100 / tabTexts.length;
  const leftPosition = `${activeIndex * tabWidth}%`;

  return (
    <div className="flex items-center justify-start max-w-fit gap-2 sticky top-0">
      {tabTexts.map((text, index) => (
        <div
          key={index}
          className={classNames('px-3.5 pt-2.5 pb-[13px] flex items-center justify-center cursor-pointer text-sm font-medium transition-colors duration-300 capitalize w-1/2', {
            'text-primary-2300': text === tab,
            'text-primary-700': text !== tab,
          })}
          onClick={() => onClick(text)}>
          {text}
        </div>
      ))}

      <motion.div
        initial={{ width: '0%' }}
        animate={{
          width: `${tabWidth}%`,
          left: leftPosition,
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-[3px] bg-primary-1000"
      />
    </div>
  );
};

export default ClickTabs;
