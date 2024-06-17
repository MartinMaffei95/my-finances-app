import * as yup from "yup";

const { required } = {
  required: "Este campo es obligatorio",
};

export const newAccountValidationSchema = yup.object({
  name: yup.string().required(required),
});
