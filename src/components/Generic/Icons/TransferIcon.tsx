import { FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';

type Props = {}
const TransferIcon: FC<Props> = ({}) => {
    return <span className=" bg-yellow-500 p-2 rounded-full aspect-square text-neutral-100">
   <FaArrowRight />
  </span>
}

export default TransferIcon;