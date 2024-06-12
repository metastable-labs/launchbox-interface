import NavAction from './nav-action';
import { INavActions } from './types';
import LBHam from '../ham';

const Right = ({ menuOpen, toggleMenu, actionItems }: { menuOpen: boolean; toggleMenu: () => void; actionItems: INavActions }) => {
  return (
    <div>
      <div className="hidden md:flex gap-4 items-center justify-center">
        {actionItems?.map((item, index) => (
          <NavAction key={index} {...item} />
        ))}
      </div>

      <LBHam isOpen={menuOpen} onClick={toggleMenu} />
    </div>
  );
};

export default Right;
