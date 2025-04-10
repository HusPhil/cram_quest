import { axiosInstance } from "../../../../lib/axios/axiosInstance";
import { signInEndRoute } from "../../router/auth_router";
import { SignInSchema } from "../../schema/auth_schema";

export const signIn = async ({ username, password }: SignInSchema) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const { data: response } = await axiosInstance.post(
    signInEndRoute,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    }
  );

  return response; // Assuming the response from the backend is the user data
};
