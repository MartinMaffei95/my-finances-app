import { FC } from 'react';
import { RiArrowDownDoubleLine,RiArrowDownSLine, RiEqualLine  } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

type ArrowTypes ="INCREASE"|"DOUBLE_INCREASE"|"DOUBLE_DECREASE"|"DECREASE"|"EQUAL"
type Props = {type:ArrowTypes,className?:string}
const StatArrow: FC<Props> = ({type,className}) => {
    const baseSx ="text-2xl font-bold"
    const arrowStyle:{[arrow in ArrowTypes]:string} ={
        INCREASE: 'text-green-600 rotate-180',
        DOUBLE_INCREASE: 'text-green-600 rotate-180',
        DOUBLE_DECREASE: 'text-red-600',
        DECREASE: 'text-red-600',
        EQUAL:"text-yellow-800"
    }
    if(type === "DECREASE" || type === "INCREASE"  )return<RiArrowDownSLine  className={twMerge("",baseSx,arrowStyle[type],className)}/>
    if(type === "DOUBLE_INCREASE" || type === "DOUBLE_DECREASE"  )return<RiArrowDownDoubleLine  className={twMerge("",baseSx,arrowStyle[type],className)}/>
    if(type === "EQUAL") return <RiEqualLine  className={twMerge("",baseSx,arrowStyle[type],className)}/>
}

export default StatArrow;