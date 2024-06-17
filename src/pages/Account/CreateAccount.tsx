import {
  adaptAccountsToOptions,
  adaptCurrenciesToOptions,
} from "@/adapters/account.adapter";
import { adaptCategoriesToOptions } from "@/adapters/category.adapter";
import ChakraControled from "@/components/Generic/Input/ChakraControled";
import ChakraControlledSelect from "@/components/Generic/Input/ChakraControlledSelect";
import PageView from "@/components/Generic/PageView/PageView";
import PaperComponent from "@/components/Generic/Paper/Paper";
import Title from "@/components/Generic/Title/Title";
import { newAccountValidationSchema } from "@/config/schemas/account.schema";
import { useApiRequest } from "@/hooks/useApiRequest";
import {
    AccountTypes,
  NewAccountPostObject,
  Option,
} from "@/interfaces";
import AccountService from "@/services/Account.service";
import CategoriesService from "@/services/Category.service";
import {
    Button,
  FormControl,
  FormLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Tooltip,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { HexColorPicker } from "react-colorful";
import { hexToRgba } from "@/utils/helpers";
import { AccountState, useAccountStore } from "@/state/accounts.state";
import CircularButton from "@/components/Buttons/CircularButton/CircularButton";
type Props = {};
const CreateAccount: FC<Props> = ({}) => {
  // Get accounts options
  const accountService = new AccountService();
  const accountRequest = useApiRequest(() => accountService.getAccounts(), {
    adapter: (accounts) => adaptAccountsToOptions(accounts?.data || []),
  });
  // Get categories options
  const categoyService = new CategoriesService();
  const categoryRequest = useApiRequest(() => categoyService.getCategories(), {
    adapter: (categories) => adaptCategoriesToOptions(categories?.data || []),
  });

  // Get Currencies
  const currencyRequest = useApiRequest(() => accountService.getCurrencies(), {
    adapter: (currencies) => adaptCurrenciesToOptions(currencies?.data || []),
  });

  // Get Currencies
  const getAccountTypesRequest = useApiRequest(
    () => accountService.getAccountsTypes(),
    {
      adapter: (accountTypes): Option[] => {
        if (!accountTypes?.data) {
          return [];
        }
        return accountTypes?.data.map((at) => ({
          id: at,
          label: at,
          value: at,
        }));
      },
    }
  );

  // CreateAccount
  const { status, executeRequest } = useApiRequest(
    (postObject: NewAccountPostObject) => accountService.createAccount(postObject),
    {
        succesAction:()=>{
            refresh()
            navigate("/");
            notify("Cuenta creada con éxito",{status:"success"})
        },
        errorAction:()=>{
            notify("No pudimos crear la cuenta",{status:"error"})
        }
    }
  );


  const {refresh} = useAccountStore((state:AccountState) => state)


  const toast = useToast()

  const notify =(text:string,config?:UseToastOptions)=>{
    toast({title:text,...config})
  }
  // const successToast ={
  //   title: 'Account created.',
  //   description: "We've created your account for you.",
  //   status: 'success',
  //   duration: 9000,
  //   isClosable: true,
  // }

  const [_, setIsExpense] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState<
  //   OptionWithComponent | undefined
  // >(undefined);

  type AccountForm = {
    name: "";
    description: "";
    init_balance: number;
    type_init_balance: "EXPENSE" | "INCOME";
    currency: number;
    type: AccountTypes;
    color: string;
    active_labels: "";
    //sincronization:"",
    objective: "";
    min_active:boolean,
    min:number,
    max_active:boolean,
    max:number
  };

  const navigate = useNavigate();

  // const now = dayjs();
  const initValues: AccountForm = {
    name: "",
    description: "",
    init_balance: 0,
    type_init_balance:"EXPENSE" ,
    currency: 2,
    type: "EFECTIVE",
    color: "#37a0ca",
    active_labels: "",
    //sincronization:"",
    objective: "",
    min_active:false,
    min:0,
    max_active:false,
    max:0
  };

  const onSubmit = async () => {
    const postObject: NewAccountPostObject = {
      name: values.name,
      description: values.description,
      init_balance: values.type_init_balance === "EXPENSE"  ? (values.init_balance *-1):values.init_balance,
      currency: values.currency,
      type:values.type,
      color: hexToRgba(values.color),
      //active_labels,
      max:values.max_active ?  values.max : null,
      min:values.min_active ?  values.min : null,
    };

    await executeRequest(postObject);
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik<AccountForm>({
    initialValues: initValues,
    onSubmit,
    validationSchema: newAccountValidationSchema,
  });

  useEffect(() => {
    accountRequest.executeRequest();
    categoryRequest.executeRequest();
    currencyRequest.executeRequest();
    getAccountTypesRequest.executeRequest();
  }, []);

  return (
    <PageView>
      <Title extraCss="text-primary-50">Nueva cuenta</Title>
      <PaperComponent>
        {/* tipo
        color
        etiquetas activas
        sinconizacion
        meta/limite */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="">
            <ChakraControled
              label="Nombre: "
              name="name"
              value={values.name}
              error={errors.name}
              touched={touched.name}
              handleBlur={handleBlur}
              handleChange={handleChange}
              variant="flushed"
              extraCss="flex items-center justify-end [&>label]:!mb-0"
            />
            <ChakraControled
              label="Descripción: "
              name="description"
              value={values.description}
              error={errors.description}
              touched={touched.description}
              handleBlur={handleBlur}
              handleChange={handleChange}
              variant="flushed"
              extraCss="flex items-center justify-end [&>label]:!mb-0"
            />
          </div>
          <div className="flex gap-2 items-center">
            <FormControl fontWeight={"semibold"}>Balance inicial:</FormControl>
            <Switch
              isChecked={values.type_init_balance === "EXPENSE" ? true : false}
              onChange={(value) => {
                setIsExpense(value.currentTarget.checked);
                if (value.currentTarget.checked) {
                  setFieldValue("type_init_balance", "EXPENSE");
                } else {
                  setFieldValue("type_init_balance", "INCOME");
                }
              }}
              className=""
              sx={{
                ".chakra-switch__thumb": { backgroundColor: "green.500" },
                ".chakra-switch__thumb[data-checked]": {
                  backgroundColor: "red.500",
                },
                ".chakra-switch__track": { backgroundColor: "blackAlpha.400" },
                ".chakra-switch__track[data-checked]": {
                  backgroundColor: "blackAlpha.400",
                },
              }}
            />
            <ChakraControled
              name="init_balance"
              value={values.init_balance}
              error={errors.init_balance}
              touched={touched.init_balance}
              handleBlur={handleBlur}
              handleChange={handleChange}
              type="number"
              variant="flushed"
            />
          </div>
          <ChakraControlledSelect
            name="currency"
            value={`${values?.currency}` }
            error={errors?.currency}
            touched={touched?.currency}
            options={(currencyRequest?.response.data as Option[]) || []}
            handleChange={handleChange}
            handleBlur={handleBlur}
            containerStyle={{ classNameStyle: "flex" }}
            label="Moneda: "
          />
          <ChakraControlledSelect
            label="Tipo de cuenta: "
            name="type"
            value={values?.type || ""}
            error={errors?.type}
            touched={touched?.type}
            options={(getAccountTypesRequest?.response.data as Option[]) || []}
            handleChange={handleChange}
            handleBlur={handleBlur}
            containerStyle={{ classNameStyle: "flex" }}
          />

<div className="flex gap-2 items-center">
<FormLabel>Color:</FormLabel>
            <Popover >
            <PopoverTrigger>
                <Button  className="w-full" variant={"unstyled"} background={values?.color}></Button>
            </PopoverTrigger>
            <PopoverContent className="!rounded-md !overflow-hidden !w-min">
                    <HexColorPicker color={values.color} onChange={(value)=>setFieldValue("color",value)} />
            </PopoverContent>
        </Popover>
</div>
       
          <div className={twMerge("flex gap-2 duration-150  items-center p-2 rounded-md",
            values.max_active ? "bg-transparent":"bg-neutral-100 shadow text-neutral-500"
          )}>
            <ChakraControled
              label={<>Meta de ahorro
                <Tooltip label='Objetivo de saldo positivo.' >
                    <span>
                        <FaRegQuestionCircle />
                    </span>
                </Tooltip>
              </>}
              name="max"
              value={values.max}
              error={errors.max}
              touched={touched.max}
              handleBlur={handleBlur}
              handleChange={handleChange}
              type="number"
              variant="flushed"
              extraCss="flex items-center justify-end [&>label]:!mb-0"
              isDisabled={!values.max_active}
            />
            <Switch
                isChecked={values.max_active}
                onChange={(value) => {
                    setIsExpense(value.currentTarget.checked);
                    if (value.currentTarget.checked) {
                    setFieldValue("max_active", true);
                    } else {
                    setFieldValue("max_active", false);
                    }
                }}
            />
          </div>

          <div className={twMerge("flex gap-2 duration-150  items-center p-2 rounded-md",
            values.min_active ? "bg-transparent":"bg-neutral-100 shadow text-neutral-500"
          )}>
            
            <ChakraControled
              label={<>Limite de credito
                <Tooltip label='Objetivo de saldo negativo.' >
                    <span>
                        <FaRegQuestionCircle />
                    </span>
                </Tooltip>
              </>}
              name="min"
              value={values.min}
              error={errors.min}
              touched={touched.min}
              handleBlur={handleBlur}
              handleChange={handleChange}
              type="number"
              variant="flushed"
              isDisabled={!values.min_active}

              extraCss="flex items-center justify-end [&>label]:!mb-0 "
              
            />
              <Switch
                isChecked={values.min_active}
                onChange={(value) => {
                    setIsExpense(value.currentTarget.checked);
                    if (value.currentTarget.checked) {
                    setFieldValue("min_active", true);
                    } else {
                    setFieldValue("min_active", false);
                    }
                }}
            />
          </div>
        
            <CircularButton
            action={onSubmit}
            status={status}
            />
        </form>
      </PaperComponent>
    </PageView>
  );
};

export default CreateAccount;
