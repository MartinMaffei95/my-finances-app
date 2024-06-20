import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { CustomIcon } from '../Molecule/CustomIcon';

type IconItemProps = {
  iconName: string;
  iconSelect: string;
  selectIcon: (e: React.MouseEvent<HTMLDivElement>) => void;
  style: React.CSSProperties;
};

const IconItem = memo(({ iconName, iconSelect, selectIcon, style }: IconItemProps) => {
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className={`text-2xl p-1 cursor-pointer text-white w-8 h-8 aspect-square hover:bg-neutral-900 rounded-md duration-150 ${
        iconName === iconSelect ? 'bg-neutral-900' : ''
      }`}
      onClick={(e) => selectIcon(e)}
      key={iconName}
      id={iconName}
      style={style}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeVariants}
      transition={{ duration: 0.5 }}
    >
      <CustomIcon iconName={iconName} />
    </motion.div>
  );
});

export default IconItem;
