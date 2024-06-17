import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";


type Tags = "div" | "section" 

interface Props extends PropsWithChildren {
  as?: Tags;
  extraClassName?:string
}
const PageView: FC<Props> = ({ as: Tag = "div", extraClassName,children, ...props }) => {
  return <Tag className={twMerge("pb-8  w-full min-h-full  ",extraClassName)}
  {...props}
  >{children}</Tag>;
};

export default PageView;
