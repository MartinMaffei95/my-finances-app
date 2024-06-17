const ErrorComponent = ({
  extraCss = "",
  text,
  icon,
  iconStyle = "",
  iconsPosition = "LEFT",
}: {
  extraCss?: string;
  text?: string;
  icon?: React.ReactNode;
  iconStyle?: string;
  iconsPosition?: "LEFT" | "RIGHT";
}) => {
  return (
    <div
      className={`border-2 border-red-600 rounded p-2 text-red-600 m-2  flex items-center justify-start gap-4 ${extraCss}  ${
        iconsPosition === "LEFT" ? "" : "flex-row-reverse"
      } `}
    >
      {icon && <span className={`${iconStyle}`}>{icon}</span>}
      <p>{text}</p>
    </div>
  );
};

export default ErrorComponent;
