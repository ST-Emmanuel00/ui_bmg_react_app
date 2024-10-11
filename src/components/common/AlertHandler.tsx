import { useEffect, useState } from "react";
import React from "react";
import { AxiosError } from "axios";
import { Alerts } from "../../Utils";
import { ApiResponse, ErrorApiResponse } from "../../types";
import { useNavigate } from "react-router-dom";

interface AlertHandlerProps {
  response?: ApiResponse | null;
  redirec: boolean;
  hasError: AxiosError | null;
}

export const AlertHandler: React.FC<AlertHandlerProps> = ({
  response,
  hasError,
  redirec = false,
}) => {
  const [errors, setErrors] = useState<ErrorApiResponse | null>(null);
  const [success, setSuccess] = useState<ApiResponse | null>(null);

  const navigate = useNavigate(); // Hook to navigate to different routes

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
    setSuccess(null);
    setErrors(null);
    if (errors) {
      // Asegurarse de que errors.errors esté definido y sea un array
      if (errors.errors && Array.isArray(errors.errors)) {
        errors.errors.forEach((error) => {
          Alerts({ message: error.message, type: "error" });
        });
      }
      if (redirec === true) {
        console.log("se debe redirigir");
        navigate("/");
      }
    } else if (success) {
      Alerts({ message: success.message ?? "Ok", type: "success" });
    }
  }, [errors, success]);

  return null;
};
