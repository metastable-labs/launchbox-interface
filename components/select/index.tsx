'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { ILBSelect, IOption } from './types';
import LBClickAnimation from '../click-animation';
import LBModal from '../modal';
import { SearchIcon, SecondarySelectIcon } from '@/public/icons';

const LBSelect = ({ text, disabled, onClick, options, defaultId, label, isOptional, textIcon, instruction }: ILBSelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [searchedOptions, setSearchedOptions] = useState<IOption[]>(options || []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleValue = (option: IOption) => {
    setIsOpen((prev) => !prev);
    setSelectedOption(option);

    if (onClick) onClick(option);
  };

  useEffect(() => {
    if (defaultId && options) {
      const defaultOption = options.find((option) => option.id === defaultId || option.text.toLowerCase() === defaultId.toLowerCase());
      if (defaultOption) setSelectedOption(defaultOption);
    }
  }, [defaultId, options]);

  useEffect(() => {
    if (searchText && options) {
      const filteredOptions = options.filter((option) => option.text.toLowerCase().includes(searchText.toLowerCase()));
      setSearchedOptions(filteredOptions);
    } else {
      setSearchedOptions(options || []);
    }
  }, [searchText, options]);

  return (
    <>
      <div className="flex flex-col w-full items-start gap-1 text-sm">
        <span className={classNames('text-primary-150 font-medium', { 'flex items-center justify-center gap-1': isOptional })}>
          {label}
          {isOptional && <span className="text-primary-1000"> (optional)</span>}
        </span>
        <LBClickAnimation
          onClick={toggleOpen}
          className={classNames('flex justify-between items-center gap-2 cursor-pointer py-2.5 px-3 bg-white rounded-[5px] text-center text-primary-250 w-full border border-primary-50', {
            'pointer-events-none': disabled,
          })}>
          {!selectedOption && (
            <div className={classNames('whitespace-nowrap', { 'flex items-center gap-2': textIcon })}>
              {textIcon && textIcon} {text}
            </div>
          )}
          {selectedOption && (
            <div className="flex items-center gap-2">
              {selectedOption.icon}
              <span className="whitespace-nowrap">{selectedOption.text}</span>
            </div>
          )}
          <SecondarySelectIcon />
        </LBClickAnimation>
        {instruction && <span className="text-primary-250 text-xs">{instruction}</span>}
      </div>

      <LBModal show={isOpen} close={toggleOpen} title={text}>
        <div className="w-[303px] md:w-[408px] flex flex-col gap-5">
          <div className="px-3 py-2.5 flex items-center justify-center gap-2 bg-white border border-primary-50 rounded-base">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className=" text-primary-1250 w-full outline-none placeholder:text-primary-750 text-sm tracking-[-0.084px]"
            />
          </div>

          <div className="flex flex-col self-stretch gap-6 h-[281px] overflow-y-auto overflow-x-visible">
            {searchedOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleValue(option)}
                className={classNames(
                  'flex items-center justify-between self-stretch bg-white hover:bg-primary-300 transition-colors duration-300 gap-2 px-2 rounded-base cursor-pointer text-[14px] leading-[21.7px] font-medium text-primary-250',
                  {
                    'shadow-md': selectedOption?.id === option.id,
                  },
                )}>
                <div className="flex items-center justify-center gap-2">
                  {option.icon}
                  <div className="flex flex-col">
                    <span className="text-primary-150">{option.text}</span>
                    <span className="text-[10px] leading-[15.5px]">{option.text}</span>
                  </div>
                </div>

                <span>{option.text}</span>
              </div>
            ))}
          </div>
        </div>
      </LBModal>
    </>
  );
};

export default LBSelect;
