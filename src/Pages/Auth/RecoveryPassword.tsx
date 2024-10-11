import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../Hooks";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Form, Input } from "../../components";


export const RecoveryPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
      passwordConfirmation: ""
    },
    // resolver: yupResolver(resetPaswordSchema), 
  });

  const navigate = useNavigate();
  const { token } = useParams();
  const { response, hasError, isLoading, put } = useAxios();

  const inputData = [
    {
      id: "password",
      placeholder: "Enter your new password",
      type: "password",
      icon: <MdLock />,
      register: { ...register('password') },
    },
    {
      id: "passwordConfirmation",
      placeholder: "Confirm your new password",
      type: "password",
      icon: <MdLock />,
      register: { ...register('passwordConfirmation') },
    },
  ];

  const onSubmit = handleSubmit(async (data) => {
    await put(`auth/reset-password/${token}`, data);
    if (response) {
      setTimeout(() => {
        navigate("/login");
      }, 50);
    }
  });











  return (
    <div className="flex justify-center items-start sm:items-center min-h-screen">

      <Form
      
      IsWithMessageConfirmation={true}
        onSubmit={onSubmit}
        title="Change Password"
        message="Please enter your new password below. Ensure it meets the security requirements.
                · Minimum 6 characters
                · At least one uppercase letter
                · At least one lowercase letter
                · At least one number
                · At least one special character (e.g., !@#$%^&*)
                Remember that changing your password is a good practice to keep your account secure."
        className="bg-white text-black shadow-2xl w-full max-w-md mx-auto rounded-badge overflow-hidden flex flex-col justify-start sm:justify-center min-h-screen sm:min-h-0"
        response={response}
        hasError={hasError}
        isLoading={isLoading}
      >
        {inputData.map((inputProps, index) => (
          <Input
            key={index}
            id={inputProps.id}
            placeholder={inputProps.placeholder}
            type={inputProps.type}
            register={inputProps.register}
            icon={inputProps.icon}
            required={true}
            hasError={hasError}
            liveErrors={errors}
          />
        ))}
      </Form>
    </div>
  );
};
