import React, { useEffect, useState } from "react";
import { ApiResponse, Children } from "../../types";
import { PageTitle } from "../common/PageTitle";
import { AxiosError } from "axios";
import { AlertHandler } from "../common/AlertHandler";
import { navigation } from "../../Utils/Common/navegation";
import { useNavigate } from "react-router-dom";
import { LinksMenu } from '../common/LinksMenu/LinksMenu';
import { LinkButton } from "../common/LinksMenu/LinkButton";
import { RxDashboard } from "react-icons/rx";
import { PiPicnicTableBold } from "react-icons/pi";
import { IoIosArrowBack, IoMdInformationCircle } from "react-icons/io";
import { useAuth } from "../../Hooks";
import { SendButton } from "../Buttons/Button";
import ConfirmationRequest from "../DetailsModal/ConfimationRequest";
import { LuInfo } from "react-icons/lu";

interface FormProps extends Children {
  title: string;
  message: string;
  response: ApiResponse | null;
  hasError: AxiosError | null;
  isLoading: boolean;
  to?: string;
  className?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  IsWithMessageConfirmation?: boolean
  btnreturn?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Form: React.FC<FormProps> = ({
  title,
  message,
  className,
  children,
  response,
  hasError,
  isLoading,
  to = "",
  onSubmit,
  IsWithMessageConfirmation,
  btnreturn = navigation(-1),
}) => {

  const { iduser } = useAuth();
  const navigation = useNavigate();

  const location = window.location.href

  console.log('LOCATION', location)

  useEffect(() => {
    if (response && to) {
      setTimeout(() => {
        navigation(to);
      }, 100);
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e);
  };



  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // handleClick();
  };



  return (
    <>
      <AlertHandler response={response} hasError={hasError} redirec={false} />

      <div
        className={`w-full  mix-w-3xl mx-auto overflow-hidden flex flex-col justify-start sm:justify-center min-h-screen sm:min-h-0 ${className} bg-white dark:bg-slate-800`}
      >
        <div className="flex flex-col justify-start sm:justify-center lg:px-14 py-8  space-y-4">
          <LinksMenu >
            <LinkButton label="Back" onClick={btnreturn} icon={IoIosArrowBack} />

            {
              iduser ? <>
                <LinkButton label="Dashboard" to="/admin/" icon={RxDashboard} />
                <LinkButton label="Tables" to="/admin/tables" icon={PiPicnicTableBold} />
              </>
                : null

            }

          </LinksMenu>
          <PageTitle title={title} message={message} />
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              id="recoveryForm"
              className="space-y-0 w-full"
            >
              {children}

              <div className="flex flex-col space-y-4">


                <SendButton isLoading={isLoading}></SendButton>

              </div>
            </form>
          </div>
        </div>
      </div>




      {
        IsWithMessageConfirmation && response ? <ConfirmationRequest toLink="" buttonModal={{
          buttons: [{
            label: 'Acept',
            icon: <LuInfo size={25} className="mr-3" />
          }]
        }} handleModal={toggleModal} isOpen={isModalOpen} message="Information" paragraph=
          {location.includes('ey') ? 'Your password reset has been successful, you can now log in to BMG' :
            "The email to reset your password has been sent. Please check your inbox and follow the instructions provided to complete the process."

          }
          link={location.includes('http://localhost:5173/reset-password/') ? 'http://localhost:5173' : undefined }
        ></ConfirmationRequest > : null

      }



    </>
  );
};