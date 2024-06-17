import CircleButton from '@/components/Generic/BaseButtons/CircleButton';
import { icons } from '@/config/icons.config';
import { UseApiRequestStatus } from '@/interfaces';
import { FC } from 'react';

type Props = {action:()=>void,status:UseApiRequestStatus}
const CircularButton: FC<Props> = ({
    action,
status
}) => {
    return <CircleButton
    style={{
      buttonClassName: "!fixed !bottom-2 right-0 !h-min ",
      circleClassName: "bg-primary-400 text-white p-4",
      loadingCircleClassName: "bg-primary-200",
    }}
    icon={icons("!text-xl h-8 w-8")["check"]}
    type="submit"
    onClick={() => action()}
    status={status}
    isDisabled={status === "LOADING" ? true : false}
  />
}

export default CircularButton;