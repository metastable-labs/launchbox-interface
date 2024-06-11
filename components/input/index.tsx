import classNames from 'classnames';

import { ILBInput } from './types';

const LBInput = ({ name, className, disabled, error, label, placeholder, register, rows = 3, type, variant = 'primary', instruction }: ILBInput) => {
  return (
    <div className={classNames('w-full text-sm tracking-[-0.084px] text-primary-150 flex flex-col items-start gap-1', { 'text-primary-1050': error })}>
      <label htmlFor={name}>{label}</label>

      {variant === 'primary' && (
        <input
          name={name}
          disabled={disabled}
          {...register}
          className={classNames(
            `px-[10px] pl-3 py-[10px] self-stretch w-full rounded-base border border-primary-50 bg-white shadow-nav-select-shadow placeholder-primary-750 font-normal focus:outline-none ${className}`,
          )}
          placeholder={placeholder}
          type={type}
        />
      )}

      {variant === 'secondary' && (
        <textarea
          name={name}
          disabled={disabled}
          {...register}
          className={`pr-[10px] pl-3 py-[10px] self-stretch w-full rounded-[10px] border border-primary-50 bg-white shadow-nav-select-shadow placeholder-primary-750 font-normal focus:outline-none ${className}`}
          placeholder={placeholder}
          rows={rows}
        />
      )}

      {instruction && <span className="text-primary-250 text-xs">{instruction}</span>}
    </div>
  );
};

export default LBInput;
