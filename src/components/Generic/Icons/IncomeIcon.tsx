import { StatArrow } from '@/components/Stat';
import { FC } from 'react';
import { FaArrowDown } from 'react-icons/fa';

type Props = {}
const IncomeIcon: FC<Props> = ({}) => {
    return <span className=" bg-green-500 p-2 rounded-full aspect-square text-neutral-100">
    <StatArrow type="DOUBLE_DECREASE" className='text-neutral-100' />

  </span>
}

export default IncomeIcon;