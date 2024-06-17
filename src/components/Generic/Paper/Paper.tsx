import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren {
  className?: string;
}
const PaperComponent: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge(" p-2 my-4 !border-none bg-white shadow-md rounded-md", className)}
    >
      {children}
    </div>
  );
};

export default PaperComponent;
