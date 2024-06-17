import { FC } from 'react';
import { CustomIcon } from '../SelectIcon/Molecule/CustomIcon';

type Props = {
    iconName:string
    color:string
    color2:string
}
const CategoryIcon: FC<Props> = ({iconName,color,color2}) => {
    return  <span style={{background:color ? color : "black",color:color2 ? color2 : "white"}} className=" !min-h-[2rem] !min-w-[2rem] p-2 rounded-full aspect-square text-neutral-100">
        <CustomIcon  iconName={iconName} />
    </span>
}

export default CategoryIcon;