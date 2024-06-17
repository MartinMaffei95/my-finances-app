import { Typography } from '@mui/material';
import { FC,PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
}
const StatNumber: FC<Props> = ({children}) => {
    return <Typography className="!font-bold !text-3xl">{children}</Typography>
}

export default StatNumber;