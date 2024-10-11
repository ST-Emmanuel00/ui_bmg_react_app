import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, UserOpcional } from "../../types";
import { useAxios } from "../../Hooks";
import { userEditInputsInfo } from "../../Utils";
import { Form, Input, Modal } from "../../components";
import { usersValidations } from "../../Validations";

interface UserEditProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  postEffect: () => void;
}

export const UserEdit: React.FC<UserEditProps> = ({
  user,
  isOpen,
  setIsOpen,
  postEffect,
}) => {

  const { response, hasError, isLoading, put } = useAxios();
  const { register, handleSubmit, setValue, formState: {
    errors
  } } = useForm<UserOpcional>({
    resolver: yupResolver(usersValidations.userEditSchema),
    defaultValues: {
      ...user,
    },
  });

  // Set form values when the modal opens
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key as keyof User, user[key as keyof User]);
      });
    }
  }, [user, setValue]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };


  const onsubmit = handleSubmit(async (data) => {
    const userRecord: Record<string, unknown> = { ...data };
    const success = await put(`users/${userRecord.id}`, userRecord);
    if (success) {
      postEffect()
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
  });


  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={handleModal}>
        <Form
          title={"Update Your Information"}
          message={"To keep your account up to date, please fill out the form below to modify your user information. Make sure to provide accurate details, especially your email address, as this will help us communicate important updates and notifications"}
          onSubmit={onsubmit}
          btnreturn={handleModal}
          response={response}
          hasError={hasError}
          isLoading={isLoading}
        >
          <div className="grid grid-cols-1 mx-3 md:grid-cols-2 gap-4">
            {userEditInputsInfo().map((inputProps, index) => (
              <Input
                key={index}
                id={inputProps.id}
                label={inputProps.label}
                placeholder={inputProps.placeholder}
                type={inputProps.type}
                register={register(inputProps.id as keyof User)}
                hasError={hasError}
                response={response}
                required={false}
                disabled={inputProps.disabled}
                readonly={inputProps.readonly}
                options={inputProps.options}
                liveErrors={errors}
              />
            ))}
          </div>
        </Form>
      </Modal>
    </div>
  );
};
