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

type SelectIcon = {
  setFieldValue: Function;
  name: string;
  value: string;
};

const SelectIcon = ({ setFieldValue, name, value }: SelectIcon) => {
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
        className={`text-4xl p-1 cursor-pointer text-white hover:bg-neutral-900 rounded-md ${
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

  return (
    <div className=" h-3/6">
      <span className="flex items-center gap-4 mt-1 mb-1">
        Icono:
        {iconSelect ? (
          <div className="text-4xl p-2 ">
            <CustomIcon iconName={`${iconSelect}`} />
          </div>
        ) : (
          <div className="text-4xl p-2"></div>
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
