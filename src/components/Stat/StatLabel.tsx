import { FC,PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
}
const StatLabel: FC<Props> = ({children}) => {
    return <p className='font-medium text-stone-500'>{children}</p>
}

export default StatLabel;