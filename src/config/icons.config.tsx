import { AiOutlineMenu } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { FaCalculator, FaCheck, FaExchangeAlt, FaMinus, FaPlus } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { twMerge } from "tailwind-merge";


export type ConfigButton = 
| "logo"
| "menu_hamburguer"
| "plus"|"minus"|"exchange" |"check" |"account"
|"dropdown"
type GetIcon=(className?:string)=>{[iconName in ConfigButton]:JSX.Element}
const baseStyle =""

export const icons:GetIcon =(className?:string)=>({
    logo:<FaCalculator className={twMerge(baseStyle,className)}/>,
    menu_hamburguer:<AiOutlineMenu className={twMerge(baseStyle,className)}/>,
    exchange:<FaExchangeAlt  className={twMerge(baseStyle,className)}/>,
    minus:<FaMinus  className={twMerge(baseStyle,className)}/>,
    plus:<FaPlus  className={twMerge(baseStyle,className)}/>,
    check:<FaCheck className={twMerge(baseStyle,className)}/>,
    account:<MdAccountBalance className={twMerge(baseStyle,className)} />,
    dropdown:<BiChevronDown className={twMerge(baseStyle,className)} />

})