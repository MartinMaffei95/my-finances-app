import CategoryIcon from '@/components/Generic/Icons/CategoryIcon';
import PaperComponent from '@/components/Generic/Paper/Paper';
import Title from '@/components/Generic/Title/Title';
import { useApiRequest } from '@/hooks/useApiRequest';
import { QueryObject } from '@/interfaces';
import AccountService from '@/services/Account.service';
import MoveService from '@/services/Move.service';
import { formatDate } from '@/utils/helpers';
import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {}
const Account: FC<Props> = ({}) => {
    
    // Get accounts
    const accountService = new AccountService();
    const {executeRequest,response} = useApiRequest((id:number) => accountService.getAccountById(id));

    const {accountId} = useParams()


    const moveService = new MoveService();
    const moveResponse = useApiRequest((filters?: QueryObject[], page?: number) =>
      moveService.getAllMoves(filters, page)
    );
  
    const [filters] = useState<QueryObject>({
      order:"DESC",
      limit:"15",
      account:accountId ? accountId :""
    })
    const fetchData = async ()=>{
        if(accountId ){
            await executeRequest(+accountId)
            await moveResponse.executeRequest([filters]);
        }
    }
    useEffect(()=>{
        fetchData()
    },[accountId])
    return <>
    <Title extraCss="text-primary-50">{response.data?.name}</Title>
    <span className="text-primary-100 text-sm">
        {response.data?.description}
    </span>
    <PaperComponent>
        <Stat>
            <StatLabel>{response?.data?.name}</StatLabel>
            <StatNumber>${response?.data?.balance}</StatNumber>
            <StatHelpText>
              Vs. hoy hace 30 días
              <StatArrow type="increase" />
              {response?.data?.daysAgo?.d30?.differencePercentage.toFixed(2)}%
              (${response?.data?.daysAgo?.d30?.differenceInt})
            </StatHelpText>
          </Stat>
    </PaperComponent>
    <PaperComponent>
    <ul className="bg-neutral-100 rounded-md ">
          {moveResponse?.response?.data?.data.map((move) => (
            <li className="flex flex-col rounded-md my-1 bg-white shadow p-2">
              
              <div className="flex justify-between">
                {/* {
                  move.type === "EXPENSE"
                  ?
                  <ExpenseIcon/>
                  :
                  move.type === "INCOME"
                  ? 
                  <IncomeIcon/>
                  :
                   <IncomeIcon/>
                } */}
                <div className=' flex flex-col items-center'>
                  {
                   move?.category?.icon ?
                   <CategoryIcon color={move?.category?.color ||""} color2={move?.category?.color2 ||""} iconName={move?.category?.icon} />
                   :null
                  }
                   <span className='text-sm font-medium'>
                    {move.category.name}
                   </span>
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
    </>
}

export default Account;