import { FC, PropsWithChildren } from "react";
import { UseApiRequestStatus } from "../../interfaces";
import Loader from "./Loader";
import { Button } from "@chakra-ui/react";

interface Props extends PropsWithChildren {
  status: UseApiRequestStatus;
  exequteRequest?: Function;
}
const LoadingWrapper: FC<Props> = ({ children, status, exequteRequest }) => {
  return (
    <>
      {status === "LOADING" ? (
        <div className="w-full h-full flex items-center justify-center ">
          <Loader />
        </div>
      ) : status === "ERROR" ? (
        <div className="border border-red-500 rounded-md p-2 flex flex-col justify-center items-center text-red-600">
          <p>Ocurrió un error mientras buscabamos la información</p>
          <Button
            onClick={() => exequteRequest && exequteRequest()}
            colorScheme="red"
          >
            Reintentar
          </Button>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
