import { FC, useEffect, useState } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import AccountService from "@/services/Account.service";
import LoadingWrapper from "@/components/Loader/LoadingWrapper";
import {
  Divider,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";
import PaperComponent from "@/components/Generic/Paper/Paper";
import CircleButton from "@/components/Generic/BaseButtons/CircleButton";
import Title from "@/components/Generic/Title/Title";
import MoveService from "@/services/Move.service";
import { QueryObject } from "@/interfaces";
import { formatDate, formatMoney } from "@/utils/helpers";
import { icons } from "@/config/icons.config";
import { useNavigate } from "react-router-dom";
import ExpenseIcon from "@/components/Generic/Icons/ExpenseIcon";
import IncomeIcon from "@/components/Generic/Icons/IncomeIcon";

type Props = {};
const Home: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const accountService = new AccountService();

  const { response, status, executeRequest } = useApiRequest(() =>
    accountService.getAccounts()
  );
  const moveService = new MoveService();
  const moveResponse = useApiRequest((filters?: QueryObject[], page?: number) =>
    moveService.getAllMoves(filters, page)
  );

  const [filters] = useState<QueryObject>({
    order: "DESC",
    limit: "5",
  });
  useEffect(() => {
    executeRequest();
    moveResponse.executeRequest([filters]);
  }, []);
  return (
    <>
      <PaperComponent className="">
        <LoadingWrapper exequteRequest={() => executeRequest()} status={status}>
          <Stat>
            <StatLabel>{response?.data?.data[0]?.name}</StatLabel>
            <StatNumber >${formatMoney(response?.data?.data[0]?.balance)}</StatNumber>
            <StatHelpText>
              Vs. hoy hace 30 días
              <StatArrow type={response?.data?.data[0]?.daysAgo?.d30?.differencePercentage && response?.data?.data[0]?.daysAgo?.d30?.differencePercentage > 0 ? "increase" : "decrease" } />
              {response?.data?.data[0]?.daysAgo?.d30?.differencePercentage.toFixed(2)}%
            </StatHelpText>
          </Stat>

          <div className="flex gap-2 justify-around">
            <div>
              <p className="flex gap-1 items-center">
               <ExpenseIcon/>
                 Gastos
              </p>
              <p className=" text-center text-lg font-semibold">${response.data?.data[0].totalExpense}</p>
            </div>
            <div>
              <p className="flex gap-1 items-center">
                <IncomeIcon/>
                 Ingresos
              </p>
              <p className=" text-center text-lg font-semibold">${response.data?.data[0].totalIncome}</p>
            </div>
          </div>
        </LoadingWrapper>
      </PaperComponent>

      <div className="flex justify-around items-center   ">
        <CircleButton
          icon={icons()["plus"]}
          label="Ingreso"
          onClick={() => navigate("/move?action=income")}
        />
        <CircleButton
          icon={icons()["exchange"]}
          label="Trasnferencia"
          onClick={() => navigate("/move?action=transference")}
        />
        <CircleButton
          icon={icons()["minus"]}
          label="Egreso"
          onClick={() => navigate("/move?action=expense")}
        />
      </div>
      <PaperComponent>
        <Title as="h3">Ult. Movimientos</Title>
        <Divider />
        <ul className="bg-neutral-100 rounded-md ">
          {moveResponse?.response?.data?.data.map((move) => (
            <li className="flex flex-col rounded-md my-1 bg-white shadow p-2">
              <div className="flex justify-end">
                <div>{move.parsedType}</div>
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
  );
};

export default Home;
