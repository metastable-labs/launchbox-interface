const PlusAltIcon = ({ width = 20, height = 20, color = '#375DFB' }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25 9.25H6.25V10.75H9.25V13.75H10.75V10.75H13.75V9.25H10.75V6.25H9.25V9.25Z"
      fill={color}
    />
  </svg>
);

export default PlusAltIcon;
