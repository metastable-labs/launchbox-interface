const TrendIcon = ({ width = 13, height = 12, color = '#6E330C' }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13 12" fill="none">
    <path
      d="M3.54999 1.9502V9.1502H10.75V10.0502H2.64999V1.9502H3.54999ZM10.4318 3.43205L11.0681 4.06835L8.49999 6.6365L7.14999 5.28695L5.21814 7.21835L4.58184 6.58205L7.14999 4.0139L8.49999 5.36345L10.4318 3.43205Z"
      fill={color}
    />
  </svg>
);

export default TrendIcon;
