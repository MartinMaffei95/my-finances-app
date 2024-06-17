import PaperComponent from '@/components/Generic/Paper/Paper';
import { Move } from '@/interfaces';
import { formatDate } from '@/utils/helpers';
import { FC } from 'react';

type Props = {
    moves:Move[]
}
const MovesList: FC<Props> = ({moves}) => {
    return  <PaperComponent>
    {/* <Title as="h3">Ult. Movimientos</Title> */}
    {/* <Divider /> */}
    <ul className="bg-neutral-100 rounded-md ">
      {moves.map((move) => (
        <li className="flex flex-col rounded-md my-1 bg-white shadow p-2">
          <div className="flex justify-end">
            <div>
                {move.parsedType}
              </div>
            <p className="font-bold">${move.value}</p>
          </div>
          <span className="text-xs text-stone-400 text-right">
            {formatDate(move.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  </PaperComponent>
}

export default MovesList;