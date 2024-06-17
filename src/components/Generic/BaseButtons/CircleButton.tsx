import { UseApiRequestStatus } from '@/interfaces';
import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { CgSpinner } from 'react-icons/cg';

type Props = {
        label?:string
        icon:JSX.Element
        type?:"submit"
        onClick?:()=>void
        style?:{
          circleClassName?:string
          buttonClassName?:string
          loadingCircleClassName?:string
        }
        status?:UseApiRequestStatus
        isDisabled?:boolean
}
const CircleButton: FC<Props> = ({label,icon,onClick,style,type,status,isDisabled}) => {
    return  <Button
    isDisabled={isDisabled}
      type={type}
      onClick={()=>onClick && onClick()} className={twMerge("!bg-transparent !h-full",style?.buttonClassName)}>
    <div className="!rounded-full flex flex-col items-center justify-center  gap-2">
      <div className={twMerge("bg-white duration-100 p-4 rounded-full shadow-md",style?.circleClassName,status ==="LOADING" ? style?.loadingCircleClassName :"")}>
        {status==="LOADING" ? <CgSpinner className='animate-spin text-white' /> : icon}
        
      </div>
      {
        label ?
        <span className="text-white"> {label}</span>
        : null
      }
    </div>
  </Button>
}

export default CircleButton;