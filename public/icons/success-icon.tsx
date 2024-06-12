const SuccessIcon = ({ height = 96, width = 96 }: { width?: number; height?: number }) => (
  <svg width={width} height={height} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.545455" y="0.545455" width="94.9091" height="94.9091" rx="47.4545" fill="url(#paint0_linear_2737_26925)" />
    <rect x="0.545455" y="0.545455" width="94.9091" height="94.9091" rx="47.4545" stroke="url(#paint1_linear_2737_26925)" stroke-width="1.09091" />
    <g filter="url(#filter0_d_2737_26925)">
      <rect x="17.4541" y="17.4546" width="61.0909" height="61.0909" rx="30.5455" fill="#38C793" />
      <rect x="17.9996" y="18" width="60" height="60" rx="30" stroke="#CBF5E5" stroke-width="1.09091" />
      <path d="M45.7086 51.6334L56.2376 41.1032L57.8585 42.7229L45.7086 54.8727L38.4189 47.5831L40.0386 45.9634L45.7086 51.6334Z" fill="#EFFAF6" />
    </g>
    <defs>
      <filter id="filter0_d_2737_26925" x="13.4541" y="15.4546" width="69.0908" height="69.0909" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.04 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2737_26925" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2737_26925" result="shape" />
      </filter>
      <linearGradient id="paint0_linear_2737_26925" x1="48" y1="0" x2="48" y2="105.273" gradientUnits="userSpaceOnUse">
        <stop stop-color="#E9FFF6" />
        <stop offset="1" stop-color="white" />
      </linearGradient>
      <linearGradient id="paint1_linear_2737_26925" x1="48" y1="0" x2="48" y2="96" gradientUnits="userSpaceOnUse">
        <stop stop-color="#38C793" />
        <stop offset="0.765625" stop-color="#E4E5E7" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default SuccessIcon;
