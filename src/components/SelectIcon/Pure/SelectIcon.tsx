import {
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as FaIcons from 'react-icons/fa';
import { CustomIcon } from '../Molecule/CustomIcon';
import { motion } from 'framer-motion';
import CategoryIcon from '@/components/Generic/Icons/CategoryIcon';
import { FaX } from 'react-icons/fa6';
type SelectIcon = {
  setFieldValue: Function;
  name: string;
  value: string;
  actualColor:string
  actualColor2:string
};

const SelectIcon = ({ setFieldValue, name, value ,actualColor,actualColor2}: SelectIcon) => {
  const [iconNames] = useState<string[]>(Object.keys(FaIcons));
  const [iconNamesFiltered,setIconNamesFiltered] = useState<string[]>([]);

  const [iconSelect, setIconSelect] = useState<string>(value);

  const selectIcon = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    setIconSelect(id);
    setFieldValue(name, id);
  };

  useEffect(() => {
    setIconSelect(value);
  }, [value]);

  const [search,setSearch ] = useState("")

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

  const renderIcons = (iconSelect: string) => {
    const iconsToRender = search.length > 0 ? iconNamesFiltered : iconNames;
    
    return iconsToRender.map((iN) => (
        <motion.div
            className={`text-2xl p-1 cursor-pointer text-white w-8 h-8 aspect-square hover:bg-neutral-900 rounded-md duration-150 ${
                iN === iconSelect ? 'bg-neutral-900' : ''
            }`}
            onClick={(e) => selectIcon(e)}
            key={iN}
            id={iN}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeVariants}
            transition={{ duration: 0.5 }}
        >
            <CustomIcon iconName={iN} />
        </motion.div>
    ));
  };

  const memoizedCallback = useMemo(() => renderIcons(iconSelect), [iconSelect,search]);

  const MotionCategoryIcon = motion(CategoryIcon)

  const filterIcons =(searchValue:string)=>{
    setSearch(searchValue)
    const lowerSearch=searchValue.toLocaleLowerCase()
    const filteredIcons = iconNames.filter(icon=> icon.toLocaleLowerCase().includes(lowerSearch))
    if(filteredIcons) return setIconNamesFiltered(filteredIcons)
  }
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
      <div className=' w-full flex relative rounded-md  shadow-md mb-2 '>
        <input onChange={(e)=>{filterIcons(e.target.value)}}  value={search} className='w-full p-1 rounded'/>
        <button onClick={()=>setSearch("")} className='absolute top-1/2 right-2 -translate-y-1/2 bg-neutral-300 p-1 rounded-full'>
          <FaX  className='h-2 w-2 text-stone-600 '/>
        </button>
      </div>
      <div className="flex flex-wrap bg-neutral-500 w-full p-2 gap-1 justify-around overflow-scroll h-56 ">
        {memoizedCallback}
        {/* {renderIcons(iconSelect)} */}
      </div>
    </div>
  );
};

export default SelectIcon;
