import { FC,PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
}
const StatHelpText: FC<Props> = ({children}) => {

    return <span className='!text-stone-500 text-sm flex items-center'>{children}</span>
}

export default StatHelpText;