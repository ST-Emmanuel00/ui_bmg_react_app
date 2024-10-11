import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAxios } from "../../Hooks";
import { initialUserState, UserCreateI } from "../../types";
import { usersValidations } from "../../Validations";
import { Container, Form, Input } from "../../components";
import { userCreateInputsInfo } from "../../Utils";


export const UserCreate = () => {
  const { response, hasError, isLoading, post } = useAxios();
  const { register, handleSubmit, formState: { errors } } = useForm<UserCreateI>({
    resolver: yupResolver(usersValidations.userSchema),
    defaultValues: {
      ...initialUserState,
    },
  });

  const onsubmit = handleSubmit(async (data) => {
    const userRecord: Record<string, unknown> = { ...data };
    await post(`users`, userRecord);
  });

  return (
    <Container>
      <Form
        title={"Create new Account"}
        message={"Please fill out the form below to create your account. Make sure to use a valid email address, as you will receive a verification link to activate your account."}
        onSubmit={onsubmit}
        response={response}
        hasError={hasError}
        isLoading={isLoading}
        to="/admin/users/"
      >
        <div className="grid grid-cols-1  px-3 md:grid-cols-2 gap-4">
          {userCreateInputsInfo().map((inputProps, index) => (
            <Input
              key={index}
              id={inputProps.id}
              label={inputProps.label}
              placeholder={inputProps.placeholder}
              type={inputProps.type}
              register={register(inputProps.id as keyof UserCreateI)}
              hasError={hasError}
              response={response}
              required={false}
              options={inputProps.options}
              liveErrors={errors}
            />
          ))}
        </div>
      </Form>
    </Container>
  );
};