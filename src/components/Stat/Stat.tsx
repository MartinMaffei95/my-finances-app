import { FC,PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
}
const Stat: FC<Props> = ({children}) => {
    return <div>{children}</div>
}

export default Stat;