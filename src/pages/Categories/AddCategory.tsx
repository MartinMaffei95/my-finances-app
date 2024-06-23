import CircularButton from "@/components/Buttons/CircularButton/CircularButton";
import ChakraControled from "@/components/Generic/Input/ChakraControled";
import PageView from "@/components/Generic/PageView/PageView";
import PaperComponent from "@/components/Generic/Paper/Paper";
import Title from "@/components/Generic/Title/Title";
import GetCategories from "@/components/Modal/GetCategories/GetCategories";
import SelectIcon, { IconHandle } from "@/components/SelectIcon/Pure/SelectIcon";
import { categoryValidationSchema } from "@/config/schemas/category.schema";
import { useApiRequest } from "@/hooks/useApiRequest";
import { PostNewCategory } from "@/interfaces";
import CategoriesService from "@/services/Category.service";
import {
  Button,
  FormControl,
  FormLabel,

  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FC,  useRef} from "react";
import { HexColorPicker } from "react-colorful";
import { twMerge } from "tailwind-merge";


type Props = {};

const AddCategory: FC<Props> = ({}) => {
  const categoyService = new CategoriesService();
  const {executeRequest,status} = useApiRequest(
    (postObject:PostNewCategory) => categoyService.createCategory(postObject)
  );

 

  interface CategoryForm extends PostNewCategory {
    parent_active:boolean
  }

  const initValues: CategoryForm = {
    name: "",
    color: "#aaa5d6",
    color2: "#000",
    icon: "",
    parent: undefined,
    parent_active:false
  };
  const childRef = useRef<IconHandle>(null);

  const onSubmit = async () => {
  if(!values.name)return
    const postObject:PostNewCategory = {
        name: values.name,
        color:values.color,
        color2:values.color2,
        icon:values.icon,
        parent:values.parent_active ? values.parent :undefined
    }
    await executeRequest(postObject)
    childRef?.current?.resetSearch()
    resetForm()
  };

  const {
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
    resetForm
  } = useFormik<CategoryForm>({
    initialValues: initValues,
    onSubmit,
    validationSchema: categoryValidationSchema,
  });



  return (
    <>
        <PageView>
      <Title extraCss="text-primary-50">Nueva categoria</Title>
      <PaperComponent>
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
        <div className="flex gap-2 items-center">
          <FormLabel>Color:</FormLabel>
          <Popover>
            <PopoverTrigger>
              <Button
                className="w-full"
                variant={"unstyled"}
                background={values?.color}
              ></Button>
            </PopoverTrigger>
            <PopoverContent className="!rounded-md !overflow-hidden !w-min">
              <HexColorPicker
                color={values.color}
                onChange={(value) => setFieldValue("color", value)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-2 items-center">
          <FormLabel>Color 2:</FormLabel>
          <Popover>
            <PopoverTrigger>
              <Button
                className="w-full"
                variant={"unstyled"}
                background={values?.color2}
              ></Button>
            </PopoverTrigger>
            <PopoverContent className="!rounded-md !overflow-hidden !w-min">
              <HexColorPicker
                color={values.color2}
                onChange={(value) => setFieldValue("color2", value)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div 
        className={twMerge("flex gap-2 duration-150  items-center py-2 rounded-md",
        values.parent_active ? "bg-transparent":"bg-neutral-100 shadow text-neutral-500"
      )}
        >
          <FormControl fontWeight={"semibold"}>Categoria padre:</FormControl>
          <GetCategories
              selectAction={(c) => {
                setFieldValue("parent", c.value)
              }}
            />
          <Switch
                isChecked={values.parent_active}
                onChange={(value) => {
                    if (value.currentTarget.checked) {
                    setFieldValue("parent_active", true);
                    } else {
                    setFieldValue("parent_active", false);
                    }
                }}
            />
        </div>
        <SelectIcon
          actualColor={values?.color ||""}
          actualColor2={values?.color2 ||"#000"}
          setFieldValue={setFieldValue}
          name={"icon"}
          value={values.icon || ""}
          ref={childRef}
        />

      
      </PaperComponent>
    </PageView>
    <CircularButton
            action={onSubmit}
            status={status}
            />
    </>

  );
};

export default AddCategory;
