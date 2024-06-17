import { Button } from "@chakra-ui/react";
import { FC } from "react";
import Loader from "../../Loader/Loader";
import { UseApiRequestStatus } from "@/interfaces";
import { twMerge } from "tailwind-merge";
import { buttonConfig, ButtonConfig, ButtonsConfigs } from "@/config/buttons";
import { icons } from "@/config/icons.config";

interface buttonExtraConfig extends Partial<ButtonConfig> {
  onClick?: Function;
}
interface Props {
  baseConfig: ButtonsConfigs;
  extraConfig?: buttonExtraConfig;
  state?: UseApiRequestStatus | undefined;
  onClick?: Function;
}
const AppButton: FC<Props> = ({ baseConfig, extraConfig, state, onClick }) => {
  const button = { ...buttonConfig.getConfig(baseConfig), ...extraConfig };
  const loadingButton = {
    ...buttonConfig.getConfig(baseConfig).laodingConfig,
    ...extraConfig?.laodingConfig,
  };

  return (
    <Button
      onClick={() => {
        if (extraConfig?.onClick) {
          extraConfig?.onClick();
        }
        if (onClick) {
          onClick();
        }
      }}
      className={twMerge(
        buttonConfig.getConfig(baseConfig).class,
        extraConfig?.class
      )}
      variant={button.variant ? button.variant  : "unstyled" }
      size={button.size}
    >
      {state === "LOADING" ? (
        <>
          {loadingButton.icon ? loadingButton.icon : <Loader />}
          <span>{loadingButton.text}</span>
        </>
      ) : state === "ERROR" ? (
        <>
          { button?.icon?.icon && button?.icon?.position!=="RIGHT" ? icons(button?.icon?.className)[button?.icon?.icon] : null}
          <span>{button?.text}</span>
          { button?.icon?.icon && button?.icon?.position==="RIGHT" ? icons(button?.icon?.className)[button?.icon?.icon] : null}
        </>
      ) : state === "SUCCESS" ? (
        <>
          { button?.icon?.icon && button?.icon?.position!=="RIGHT" ? icons(button?.icon?.className)[button?.icon?.icon] : null}
          <span>{button?.text}</span>
          { button?.icon?.icon && button?.icon?.position==="RIGHT" ? icons(button?.icon?.className)[button?.icon?.icon] : null}
        </>
      ) : (
        <>
          { button?.icon?.icon && button?.icon?.position!=="RIGHT" ? icons(button?.icon?.className)[button?.icon?.icon] : null}
          <span>{button?.text}</span>
          { button?.icon?.icon && button?.icon?.position==="RIGHT" ? icons(button?.icon?.className)[button?.icon?.icon] : null}
        </>
      )}
    </Button>
  );
};

export default AppButton;
