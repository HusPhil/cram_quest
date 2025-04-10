import { axiosInstance } from "../../../../lib/axios/axiosInstance";
import { signUpEndRoute } from "../../router/auth_router";
import { SignUpSchema } from "../../schema/auth_schema";

export const signUp = async ({ username, email, password }: SignUpSchema) => {
  const { data: response } = await axiosInstance.post(signUpEndRoute, {
    username,
    password,
    email,
  }, {
    withCredentials: true
  });

  return response; // Assuming the response from the backend is the user data
};
