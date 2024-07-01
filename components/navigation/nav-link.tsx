import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { NavLinkProps } from './types';

const NavLink = ({ title, icon, href, isActive, fullWidth, comingSoon, onClick }: NavLinkProps) => {
  const iconColor = isActive ? '#0A0D14' : '#525866';

  return (
    <Link
      href={href}
      onClick={onClick && onClick}
      className={classNames('py-2 pl-2 pr-3 transition-all duration-200 flex gap-2 items-center justify-start font-Clash-Display', {
        'text-primary-150 font-semibold': isActive,
        'text-primary-250': !isActive,
        'w-full': fullWidth,
        'pointer-events-none': comingSoon,
      })}>
      {React.cloneElement(icon, { color: iconColor })}
      <span className="tracking-[-0.084px] text-sm">{title}</span>
      {comingSoon && (
        <div className="min-h-full flex items-end -m-1">
          <div className="flex items-center px-2 py-[2px] bg-primary-2550 rounded-full text-[8px] leading-[12px] font-medium tracking-[0.16px] capitalize text-white whitespace-nowrap">
            Coming soon
          </div>
        </div>
      )}
    </Link>
  );
};

export default NavLink;
