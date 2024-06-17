import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { FC, FocusEventHandler, ReactEventHandler } from 'react'

interface Props extends InputProps {
  label?: string| JSX.Element
  name: string
  value: string|number
  handleChange: ReactEventHandler<HTMLInputElement>
  handleBlur: FocusEventHandler<HTMLInputElement>
  touched: boolean | undefined
  error: string | undefined
  extraCss?: string
}
const ChakraControled: FC<Props> = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  touched,
  error,
  extraCss = '',
  ...props
}) => {
  return (
    <FormControl
      className={extraCss}
      isInvalid={touched && error ? true : false}
    >
      {
        label ? 
        <FormLabel fontWeight={'semibold'} htmlFor={name}>
          {label}
        </FormLabel>
      : null
      }
      
      <Input
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default ChakraControled
