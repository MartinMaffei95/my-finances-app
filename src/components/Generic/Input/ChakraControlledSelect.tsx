import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { FocusEventHandler, ReactEventHandler, FC } from "react";
import { Option, StyleConfig } from "../../interfaces";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  name: string;
  value: string;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
  handleChange: ReactEventHandler<HTMLSelectElement>;
  touched: boolean | undefined;
  error: string | undefined;
  enabled?: boolean;
  options: Option[];
  firstOption?: string;
  containerStyle?: StyleConfig;
  labelStyle?: StyleConfig;
  inputStyle?: StyleConfig;
};

const ChakraControlledSelect: FC<Props> = ({
  label,
  name,
  value,
  touched,
  error,
  enabled = true,
  options,
  handleBlur,
  handleChange,
  firstOption,
  containerStyle,
  labelStyle,
  inputStyle,
}) => {
  return (
    <FormControl
      isDisabled={!enabled}
      isInvalid={touched && error ? true : false}
      className={twMerge("", containerStyle?.classNameStyle)}
    >
      {label ? (
        <FormLabel
          fontWeight={"semibold"}
          className={twMerge("", labelStyle?.classNameStyle)}
          htmlFor={name}
        >
          {label}
        </FormLabel>
      ) : null}
      <Select
        value={value}
        onChange={handleChange}
        name={name}
        onBlur={handleBlur}
        className={twMerge("", inputStyle?.classNameStyle)}
      >
        {firstOption ? <option value="">{firstOption}</option> : null}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ChakraControlledSelect;
