// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { signIn } from "../../../services/api/crud/auth/signIn";

const useSignIn = () => {
  const { setAccessToken } = useAuth();  

  return useMutation({
    mutationFn: signIn,
    onSuccess(data, variables, context) {
      alert("Successfully signed in");

      console.log("data: ", data);
      console.log("variables: ", variables);
      console.log("context: ", context);

      setAccessToken(data.access_token);
    },
    onError(error, variables, context) {
      alert("An ERROR OCCURED");
      // console.log("errorMessage: ", error.response.data.detail);
      console.log("error: ", error);
      console.log("variables: ", variables);
      console.log("context: ", context);
    },
  });
};

export default useSignIn;
