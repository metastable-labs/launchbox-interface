interface ILBClickAnimation {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  stopPropagation?: boolean;
  disabled?: boolean;
}
