const FlashIcon = ({ color = '#163300', height = 15, width = 14 }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 15" fill="none">
    <path d="M7.625 1.25L1.375 8.75H7L6.375 13.75L12.625 6.25H7L7.625 1.25Z" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export default FlashIcon;
