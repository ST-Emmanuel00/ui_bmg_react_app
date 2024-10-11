import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../Hooks";
import { Form } from "../../components";

export const RecoveryCode = () => {

  const { token } = useParams();
  const navigate = useNavigate();
  const { response, hasError, isLoading, put } = useAxios();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      code: ["", "", "", ""]
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    const verificationCode = data.code.join("");
    const success = await put(`auth/verify-code/${token}`, { code: verificationCode })
    if (success) {
      setTimeout(() => {
        navigate(`/reset-password/${token}`);
      }, 50);
    }
  })

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;

    if (/^[0-9]$/.test(value)) {
      const newValues = watch("code");
      newValues[index] = value;
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const currentValues = watch("code");

    if (event.key === "Backspace") {
      if (currentValues[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        currentValues[index] = "";
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-start sm:items-center min-h-screen">
      <Form
        title="Enter Verification Code"
        message="Please enter the verification code sent to your email address below. This code is necessary to verify your account and ensure its security.
                · If you didn't receive the code, you can request a new one.
                · Make sure to check your spam or junk folder if you don’t see the email in your inbox."
        className="bg-white text-black shadow-2xl w-full max-w-md mx-auto rounded-badge overflow-hidden flex flex-col justify-start sm:justify-center min-h-screen sm:min-h-0"
        onSubmit={onSubmit}
        isLoading={isLoading}
        hasError={hasError}
        response={response}
      >
        <label className="flex justify-start ml-4 text-sm font-bold leading-6 text-gray-900 mr-4">
          Code
        </label>
        <div className="flex justify-around">
          {watch("code").map((_, index) => (
            <Controller
              key={index}
              name={`code.${index}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  ref={el => inputRefs.current[index] = el}
                  className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-2xl font-medium text-gray-800 shadow-xs outline-none w-12 sm:w-14 text-center"
                  type="text"
                  maxLength={1}
                  onChange={(event) => {
                    field.onChange(event);
                    handleInput(event, index);
                  }}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                />
              )}
            />
          ))}
        </div>

      </Form>
    </div>
  );
};
