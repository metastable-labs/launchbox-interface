import { Logo } from '@/public/icons';
import NavLink from './nav-link';
import { INavLinks } from './types';
import Link from 'next/link';

const Left = ({ links }: { links: INavLinks }) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <Link href="/">
        <Logo />
      </Link>

      <div className="gap-1 md:flex items-center justify-center hidden">
        {links?.map((link) => (
          <NavLink key={link?.title} {...link} />
        ))}
      </div>
    </div>
  );
};

export default Left;
