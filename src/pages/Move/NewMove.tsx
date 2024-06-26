import {
  adaptAccountToOption,
} from "@/adapters/account.adapter";
import ChakraControled from "@/components/Generic/Input/ChakraControled";
import ChakraControlledSelect from "@/components/Generic/Input/ChakraControlledSelect";
import PaperComponent from "@/components/Generic/Paper/Paper";
import Title from "@/components/Generic/Title/Title";
import { moveValidationSchema } from "@/config/schemas/move.schema";
import { siteConfig } from "@/config/site.config";
import { useApiRequest } from "@/hooks/useApiRequest";
import {
  MovePostObject,
  MoveTypes,
  Option,
} from "@/interfaces";
import AccountService from "@/services/Account.service";
import MoveService from "@/services/Move.service";
import {
  FormControl,
  Switch,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CircularButton from "@/components/Buttons/CircularButton/CircularButton";
import { adaptCollectionElements } from "@/adapters/generic.adapter";
import GetCategories from "@/components/Modal/GetCategories/GetCategories";

type Props = {};
const NewMove: FC<Props> = ({}) => {
  const [searchParams] = useSearchParams();
  //searchParams.forEach((key,value,UrlSearchParams)=>console.log(key,value,UrlSearchParams))

  // Get accounts options
  const accountService = new AccountService();
  const accountRequest = useApiRequest(() => accountService.getAccounts(), {
    adapter: (accounts) =>
      adaptCollectionElements(accounts?.data || [], adaptAccountToOption),
  });


  const [moveType, setMoveType] = useState<MoveTypes>("EXPENSE");

  const moveService = new MoveService();
  const { status, executeRequest } = useApiRequest(
    (postObject: MovePostObject) => moveService.createMove(postObject)
  );

  const now = dayjs();
  const navigate = useNavigate();
  const [_, setIsExpense] = useState(false);

  type MoveForm = {
    type: MoveTypes;
    value: number;
    account: string | undefined;
    accountDestination: string | undefined;
    category: string | undefined;
    date: string;
    time: string;
  };

  const initValues: MoveForm = {
    type: "EXPENSE",
    value: 0,
    account: undefined,
    accountDestination: undefined,
    category: undefined,
    date: now.format("YYYY-MM-DD"),
    time: now.format(siteConfig.formats.hour),
  };

  const onSubmit = async () => {
    if (!values.account || !values.category) return;
    if (values.type === "TRANSFER" && !values.accountDestination) return;
    const postObject: MovePostObject = {
      type: values.type,
      value: values.value,
      comment: "",
      account: +values.account,
      category: +values.category,
      createdAt: `${values.date} ${values.time}`,
      accountDestination: values?.accountDestination
        ? +values?.accountDestination
        : undefined,
    };

    await executeRequest(postObject);
    navigate("/");
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik<MoveForm>({
    initialValues: initValues,
    onSubmit,
    validationSchema: moveValidationSchema,
  });

  const [destinationOptions, setDestinationOptions] = useState<Option[]>([]);

  const initialFetch = async () => {
    const accountRes = (await accountRequest.executeRequest()) as Option[];
    if (accountRes) {
      setFieldValue("account", accountRes[0].id);
    }
  };

  useEffect(() => {
    initialFetch();
    const action = searchParams.get("action");
    if (action) {
      switch (action) {
        case "transference":
          setMoveType("TRANSFER");
          break;
        case "income":
          setMoveType("INCOME");
          setFieldValue("type", "INCOME");
          break;
        case "expense":
          setMoveType("EXPENSE");
          setFieldValue("type", "EXPENSE");

          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const accounts = accountRequest?.response.data as Option[];
    if (accounts && accounts.length > 0) {
      const filteredAccounts = accounts?.filter(
        (opt) => opt?.id != values?.account
      );
      setDestinationOptions(filteredAccounts);
    }
  }, [values.account]);

  return (
    <>
      <Title extraCss="text-primary-50">Nuevo movimiento</Title>
      <PaperComponent className="!mb-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div>
            <ChakraControlledSelect
              name="account"
              value={values?.account || ""}
              error={errors?.account}
              touched={touched?.account}
              options={(accountRequest?.response.data as Option[]) || []}
              handleChange={handleChange}
              handleBlur={handleBlur}
              containerStyle={{ classNameStyle: "flex" }}
              label={moveType === "TRANSFER" ? "Cuenta origen: " : "Cuenta: "}
            />
          </div>
          {moveType === "TRANSFER" ? (
            <div>
              <ChakraControlledSelect
                name="accountDestination"
                value={values?.accountDestination || ""}
                error={errors?.accountDestination}
                touched={touched?.accountDestination}
                options={destinationOptions || []}
                handleChange={handleChange}
                handleBlur={handleBlur}
                containerStyle={{ classNameStyle: "flex" }}
                label="Cuenta destino: "
              />
            </div>
          ) : null}

          <div className="flex gap-2 items-center">
            <FormControl fontWeight={"semibold"}>Cantidad:</FormControl>
            {moveType === "TRANSFER" ? null : (
              <Switch
                isChecked={values.type === "EXPENSE" ? true : false}
                onChange={(value) => {
                  setIsExpense(value.currentTarget.checked);
                  if (value.currentTarget.checked) {
                    setFieldValue("type", "EXPENSE");
                  } else {
                    setFieldValue("type", "INCOME");
                  }
                }}
                className=""
                sx={{
                  ".chakra-switch__thumb": { backgroundColor: "green.500" },
                  ".chakra-switch__thumb[data-checked]": {
                    backgroundColor: "red.500",
                  },
                  ".chakra-switch__track": {
                    backgroundColor: "blackAlpha.400",
                  },
                  ".chakra-switch__track[data-checked]": {
                    backgroundColor: "blackAlpha.400",
                  },
                }}
              />
            )}

            <ChakraControled
              name="value"
              value={values.value}
              error={errors.value}
              touched={touched.value}
              handleBlur={handleBlur}
              handleChange={handleChange}
              type="number"
              variant="flushed"
              className="text-right !pr-2"
            />
          </div>
          <div className="flex gap-2 rounded-md p-1 ">
            <FormControl fontWeight={"semibold"}>Fecha y hora:</FormControl>
            <div>
              <ChakraControled
                name="time"
                value={values.time}
                error={errors.time}
                touched={touched.time}
                handleBlur={handleBlur}
                handleChange={handleChange}
                type="time"
                variant="flushed"
              />
              <ChakraControled
                name="date"
                value={values.date}
                error={errors.date}
                touched={touched.date}
                handleBlur={handleBlur}
                handleChange={handleChange}
                type="date"
                variant="flushed"
              />
            </div>
          </div>
          <div className="flex ">
            <FormControl fontWeight={"semibold"}>Categoria:</FormControl>
            <GetCategories
              selectAction={(c) => {
                setFieldValue("category", c.value);
              }}
            />
          </div>
          <CircularButton action={onSubmit} status={status} />
        </form>
      </PaperComponent>
    </>
  );
};

export default NewMove;
