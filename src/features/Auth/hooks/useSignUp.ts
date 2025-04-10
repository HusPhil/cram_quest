// src/features/Auth/hooks/useSignIn.ts
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../services/api/crud/auth/signUp";


const useSignUp = () => useMutation({
    mutationFn: signUp,
    onSuccess(data, variables, context) {
        console.log("data: ", data);
        console.log("variables: ", variables);
        console.log("context: ", context);
    },
    onError(error, variables, context) {
        // console.log("errorMessage: ", error.response.data.detail);
        console.log("error: ", error);
        console.log("variables: ", variables);
        console.log("context: ", context);
    },
})

export default useSignUp;
