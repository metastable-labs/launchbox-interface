const ExternalLinkIcon = ({
  width = 20,
  height = 20,
  color = "white",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M8.5 5.5V7H4.75V15.25H13V11.5H14.5V16C14.5 16.1989 14.421 16.3897 14.2803 16.5303C14.1397 16.671 13.9489 16.75 13.75 16.75H4C3.80109 16.75 3.61032 16.671 3.46967 16.5303C3.32902 16.3897 3.25 16.1989 3.25 16V6.25C3.25 6.05109 3.32902 5.86032 3.46967 5.71967C3.61032 5.57902 3.80109 5.5 4 5.5H8.5ZM16.75 3.25V9.25H15.25V5.80975L9.40525 11.6552L8.34475 10.5948L14.1887 4.75H10.75V3.25H16.75Z"
      fill={color}
    />
  </svg>
);

export default ExternalLinkIcon;
