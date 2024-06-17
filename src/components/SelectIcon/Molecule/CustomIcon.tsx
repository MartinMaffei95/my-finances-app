import * as FaIcons from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { TbError404 } from 'react-icons/tb';
type CustomIconProps = {
  iconName: string | undefined;
};

export const CustomIcon = ({ iconName = '' }: CustomIconProps) => {
  const Icon: IconType = (FaIcons as any)[iconName];
  if (!Icon)
    return (
      <p className="text-red-600">
        <TbError404 />
      </p>
    );
  return <Icon name={iconName} />;
};
