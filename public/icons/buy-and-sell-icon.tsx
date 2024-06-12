const BuyAndSellIcon = ({ width = 20, height = 20, color = '#525866' }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path
      d="M9.9626 6.9625L8.9021 8.023L7.0001 6.121V16H5.5001V6.121L3.59885 8.023L2.5376 6.9625L6.2501 3.25L9.9626 6.9625ZM17.4626 13.0375L13.7501 16.75L10.0376 13.0375L11.0981 11.977L13.0008 13.879L13.0001 4H14.5001V13.879L16.4021 11.977L17.4626 13.0375V13.0375Z"
      fill={color}
    />
  </svg>
);

export default BuyAndSellIcon;
