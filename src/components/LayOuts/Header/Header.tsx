import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import LateralMenu from "@/components/Menu/LateralMenu/LateralMenu";
import { siteConfig } from "@/config/site.config";
import { icons } from "@/config/icons.config";
import { twMerge } from "tailwind-merge";
import AccountResumeMenu from "./AccountResumeMenu";
import { FaPlus } from "react-icons/fa";
import { AccountState, useAccountStore } from "@/state/accounts.state";
type Props = {};
const Header: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen : optionsIsOpen, onOpen : optionsOnOpen, onClose : optionsOnClose } = useDisclosure();

  const useBodyBg = true;
  const {accounts,refresh,loading} = useAccountStore((state:AccountState) => state)

  useEffect(() => {
    refresh();
  }, []);
  return (
    <header
      className={twMerge(
        "h-header w-full  text- flex justify-between items-center ",
        useBodyBg ? "bg-transparent" : "bg-primary shadow-md "
      )}
    >
      <div
       
        className=" pl-4 gap-2 flex w-full justify-between"
      >
        {/* Logo */}
        <div  onClick={() => navigate("/")} className=" gap-2 flex items-center text-white">
          {icons("text-white")["logo"]}
          <p className="font-bold tracking-widest flex flex-col items-center justify-center">
            {siteConfig.projectName}
          </p>
        </div>
        {/* LATERAL MENU BTN */}
        <div className=" flex items-center justify-center">
        <Button colorScheme="" onClick={optionsOnOpen}>
            {icons("w-6 h-6")["menu_hamburguer"]}
          </Button>
          <Button colorScheme="" onClick={onOpen}>
            {icons("w-6 h-6")["account"]}
          </Button>
        </div>
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className=" !text-white !bg-primary/80 backdrop-blur-sm ">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            {/* <LateralMenu onClose={onClose} /> */}
            <Link to="/account/new" onClick={onClose} className="flex items-center justify-end rounded-md bg-primary-700/30 hover:bg-primary-600/30 duration-150 cursor-pointer   p-2 my-2">
              <div>
                <FaPlus/>
              </div>
              <p>
                Agregar cuentas
              </p>
              </Link>
              {
                loading 
                ?
                <Stack >
                <Skeleton className="!rounded-md" height={"70px"} />
                <Skeleton className="!rounded-md" height={"70px"} />
                <Skeleton className="!rounded-md" height={"70px"} />
                <Skeleton className="!rounded-md" height={"70px"} />
                <Skeleton className="!rounded-md" height={"70px"} />
              </Stack>
              :
              <ul>
                {accounts.map((account) => (
                  <AccountResumeMenu key={account.id} close={onClose} account={account} />
                ))}
              </ul>
              }
         

          
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer isOpen={optionsIsOpen} placement="right" onClose={optionsOnClose}>
        <DrawerOverlay />
        <DrawerContent className=" !text-white !bg-primary/80 backdrop-blur-sm ">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <LateralMenu onClose={optionsOnClose} />
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
