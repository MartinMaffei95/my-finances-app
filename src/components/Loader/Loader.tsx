import { CircularProgress } from "@chakra-ui/react";
import { FC } from "react";
type Props = {};
const Loader: FC<Props> = () => {
  return (
    <CircularProgress isIndeterminate color='orange.300' />
  );
};

export default Loader;
