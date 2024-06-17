import * as FaIcons from 'react-icons/fa'
import { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';
type CustomIconProps = {
  iconName: string | undefined;
  extraCss?:string
};

export const CustomIcon = ({ iconName = '',extraCss }: CustomIconProps) => {
  const Icon: IconType = (FaIcons as any)[iconName];
  if (!Icon)
    return (
    <>
    
    </>
    );
  return <Icon className={twMerge('',extraCss)} name={iconName} />;
};
