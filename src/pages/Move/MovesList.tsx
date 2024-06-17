import Title from '@/components/Generic/Title/Title';
import { useApiRequest } from '@/hooks/useApiRequest';
import { QueryObject } from '@/interfaces';
import MoveService from '@/services/Move.service';
import { FC, useEffect, useState } from 'react';

type Props = {}
const MovesList: FC<Props> = ({}) => {
    const moveService = new MoveService();

    const {  executeRequest } =useApiRequest((filters?: QueryObject[], page?: number) =>
        moveService.getAllMoves(filters, page)
      );
      const [filters] = useState<QueryObject>({
        order:"DESC",
        limit:""
      })
      useEffect(() => {
        executeRequest([filters]);
      }, []);
    return <>
    <Title></Title>
    <MovesList />
    </>
}

export default MovesList;