import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { useAxios } from "../../Hooks";
import { emailSchema } from "../../Validations/Auth/Email";



export const RecoveryEmail = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onChange"
  });

  const { response, hasError, isLoading, post } = useAxios();


  const inputData = [
    {
      id: "email", // Prop name was
      placeholder: "Enter your email",
      type: "text",
      icon: <MdEmail />,
      register: { ...register('email') },
      disabled: true, // Pass this like prop name
    },
  ];

  const onSubmit = handleSubmit(async (data) => {

    await post("auth/request-password-reset", data);
  });






  return (
    <div className="flex justify-cente sm:justify-center items-start sm:items-center min-h-screen ">

      <Form
        IsWithMessageConfirmation={true}
        onSubmit={onSubmit}
        title="Account Verification"
        message="A verification code has been sent to your email address. Please check your inbox and enter the code below to verify your account.
        If you don’t see the email, please check your spam or junk folder."
        className="bg-white text-black shadow-2xl w-full max-w-md mx-auto rounded-badge overflow-hidden flex flex-col justify-start sm:justify-center min-h-screen sm:min-h-0"
        response={response}
        hasError={hasError}
        isLoading={isLoading}

      >

        {inputData.map((inputProps, index) => (
          <Input
            hasError={hasError}
            response={response}
            key={index}
            id={inputProps.id}
            placeholder={inputProps.placeholder}
            type={inputProps.type}
            register={inputProps.register}
            icon={inputProps.icon}
            required={false}
            liveErrors={errors}
          />
        ))}
      </Form>
    </div>
  );
};

