import * as yup from "yup";

/* Exporting the Register & Login schema that was created by Yup */
export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(10, "Must be 15 characters or less")
    .required("required"),
  lastName: yup
    .string()
    .max(10, "Must be 15 characters or less")
    .required("required"),
  email: yup.string().email("Enter the valid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter the valid email").required("required"),
  password: yup.string().required("required"),
});
