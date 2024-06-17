import AppButton from "@/components/Generic/BaseButtons/AppButton";
import { Account } from "@/interfaces";
import { Collapse, ScaleFade, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  account: Account;
  close:()=>void
};
const AccountResumeMenu: FC<Props> = ({ account,close }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <li className=" rounded-md bg-primary-700 hover:bg-primary-600/70 duration-150 cursor-pointer   p-2 my-2">
      <div className="flex flex-row gap-2 items-center  ">
        <div className="flex w-full  justify-between">
          <div
            className="h-10 w-10 flex rounded-full aspect-square"
            style={{ background: account.color || "rgba(240,240,240,1)" }}
          ></div>
          <div  className="self-start flex flex-col items-end ">
            <Link onClick={close} to={`/account/${account.id}`} className="font-bold ">{account.name}</Link>
            <ScaleFade initialScale={0.9} in={!isOpen}>
              <p className="font-semibold ">${account.balance}</p>
            </ScaleFade>
          </div>
        </div>

        <div className="ml-auto">
          <AppButton
            baseConfig="dropdownIcon"
            extraConfig={{
              class: isOpen ? "rotate-180" : "",
            }}
            onClick={onToggle}
          />
        </div>
      </div>
      <Collapse in={isOpen} animateOpacity>
        <div className="w-full  flex justify-end text-xs ">
          <table className="">
            <tr>
              <td>Balance inicial</td>
              <td align="right">${account.balance}</td>
            </tr>
            <tr>
              <td>Balance hace 30 dias</td>
              <td align="right">${account?.daysAgo?.d30.balance}</td>
            </tr>
            <tr>
              <td>Ingrsos</td>
              <td align="right">${account.totalIncome}</td>
            </tr>
            <tr>
              <td>Gastos</td>
              <td align="right">${account.totalExpense}</td>
            </tr>
            <tr>
              <td>Trasnferencias</td>
              <td align="right">
                ${account.totalTransferOut + account.totalTransferIn}
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td align="right">${account.balance}</td>
            </tr>
          </table>
        </div>
      </Collapse>
    </li>
  );
};

export default AccountResumeMenu;
