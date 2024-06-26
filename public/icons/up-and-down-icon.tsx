const UpandDownIcon = ({ width = 17, height = 16, color = '#525866' }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 17 16" fill="none">
    <path
      d="M8.46979 5.56961L7.62139 6.41801L6.09979 4.89641V12.7996H4.89979V4.89641L3.37879 6.41801L2.52979 5.56961L5.49979 2.59961L8.46979 5.56961ZM14.4698 10.4296L11.4998 13.3996L8.52979 10.4296L9.37819 9.58121L10.9004 11.1028L10.8998 3.19961H12.0998V11.1028L13.6214 9.58121L14.4698 10.4296V10.4296Z"
      fill={color}
    />
  </svg>
);

export default UpandDownIcon;
