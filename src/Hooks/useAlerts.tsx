import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Alerts } from "../Utils/Common/toast";
import { ApiResponse, ErrorApiResponse } from "../types";

interface AlertHandlerProps {
  response?: ApiResponse | null;
  hasError: AxiosError | null;
}

export function useAlerts({ response, hasError }: AlertHandlerProps) {
  const [errors, setErrors] = useState<ErrorApiResponse | null>(null);
  const [success, setSuccess] = useState<ApiResponse | null>(null);

  useEffect(() => {
    if (hasError) {
      setErrors(hasError?.response?.data as ErrorApiResponse);
      setSuccess(null);
    } else if (response) {
      setSuccess(response as ApiResponse);
      setErrors(null);
    }
  }, [hasError, response]);

  useEffect(() => {
    if (errors) {
      errors.errors.forEach((error) => {
        Alerts({ message: error.message, type: "error" });
      });
    } else if (success) {
      Alerts({ message: success?.message ?? "Ok", type: "success" });
    }
  }, [errors, success]);

  // Devolver cualquier valor o función que necesites usar fuera de este Hook
  // En este caso, no estamos devolviendo nada explícitamente, ya que este Hook maneja efectos secundarios directamente
}
