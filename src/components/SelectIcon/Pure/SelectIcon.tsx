import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as FaIcons from 'react-icons/fa';
import { CustomIcon } from '../Molecule/CustomIcon';
import { motion } from 'framer-motion';
import CategoryIcon from '@/components/Generic/Icons/CategoryIcon';
type SelectIcon = {
  setFieldValue: Function;
  name: string;
  value: string;
  actualColor:string
  actualColor2:string
};

const SelectIcon = ({ setFieldValue, name, value ,actualColor,actualColor2}: SelectIcon) => {
  const [iconNames, setIconNames] = useState(Object.keys(FaIcons));
  const [iconSelect, setIconSelect] = useState<string>(value);

  const selectIcon = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    setIconSelect(id);
    setFieldValue(name, id);
  };

  useEffect(() => {
    setIconSelect(value);
  }, [value]);

  const renderIcons = (iconSelect: string) => {
    return iconNames.map((iN) => (
      <div
        className={`text-2xl p-1 cursor-pointer text-white hover:bg-neutral-900 rounded-md duration-150 ${
          iN === iconSelect ? 'bg-neutral-900' : ''
        }`}
        onClick={(e) => selectIcon(e)}
        key={iN}
        id={iN}
      >
        <CustomIcon iconName={iN} />
      </div>
    ));
  };

  const memoizedCallback = useMemo(() => renderIcons(iconSelect), [iconSelect]);

  const MotionCategoryIcon = motion(CategoryIcon)
  return (
    <div className=" h-3/6">
      <span className="flex items-center gap-4 mt-1 mb-1 ">
        Icono:
        {iconSelect ? (

              <MotionCategoryIcon
              color={actualColor}
              color2={actualColor2}
              iconName={`${iconSelect}`} />
        ) : (
          <div className="text-2xl p-2 h-8 w-8">  </div>
        )}
      </span>
      <div className="flex flex-wrap bg-neutral-500 w-full p-2 gap-1 justify-around overflow-scroll h-56 ">
        {memoizedCallback}
        {/* {renderIcons(iconSelect)} */}
      </div>
    </div>
  );
};

export default SelectIcon;
