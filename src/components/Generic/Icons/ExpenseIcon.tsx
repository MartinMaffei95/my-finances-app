import { StatArrow } from '@/components/Stat';
import { FC } from 'react';

type Props = {}
const ExpenseIcon: FC<Props> = ({}) => {
    return  <span className=" bg-red-500 p-2 rounded-full aspect-square ">
        <StatArrow type="DOUBLE_INCREASE" className='text-neutral-100' />
    </span>
}

export default ExpenseIcon;