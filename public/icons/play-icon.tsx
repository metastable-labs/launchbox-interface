const PlayIcon = ({ width = 20, height = 20, color = '#0A0D14' }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path
      d="M13.2955 9.99999L8.5 6.80274V13.1972L13.2955 9.99999ZM15.532 10.312L7.58275 15.6115C7.52628 15.6491 7.46067 15.6706 7.39292 15.6739C7.32516 15.6771 7.2578 15.6619 7.198 15.6299C7.1382 15.5979 7.0882 15.5502 7.05334 15.4921C7.01847 15.4339 7.00004 15.3673 7 15.2995V4.70049C7.00004 4.63266 7.01847 4.56611 7.05334 4.50792C7.0882 4.44974 7.1382 4.4021 7.198 4.37008C7.2578 4.33807 7.32516 4.32287 7.39292 4.32611C7.46067 4.32935 7.52628 4.35091 7.58275 4.38849L15.532 9.68799C15.5834 9.72224 15.6255 9.76863 15.6546 9.82306C15.6837 9.87749 15.699 9.93826 15.699 9.99999C15.699 10.0617 15.6837 10.1225 15.6546 10.1769C15.6255 10.2313 15.5834 10.2777 15.532 10.312Z"
      fill={color}
    />
  </svg>
);

export default PlayIcon;