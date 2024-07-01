const ExternalLinkAltIcon = ({ width = 21, height = 21, color = 'white' }: { width?: number; height?: number; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none">
    <path
      d="M9 3.75V5.25H5.25V15.75H15.75V12H17.25V16.5C17.25 16.6989 17.171 16.8897 17.0303 17.0303C16.8897 17.171 16.6989 17.25 16.5 17.25H4.5C4.30109 17.25 4.11032 17.171 3.96967 17.0303C3.82902 16.8897 3.75 16.6989 3.75 16.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H9ZM14.6895 5.25H11.25V3.75H17.25V9.75H15.75V6.3105L10.5 11.5605L9.4395 10.5L14.6895 5.25Z"
      fill={color}
    />
  </svg>
);

export default ExternalLinkAltIcon;
