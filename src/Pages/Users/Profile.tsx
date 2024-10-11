


import { useEffect, useState } from "react";
import { useAuth, useAxios } from "../../Hooks";
import { initialUserState, User } from "../../types";
import { LinkButton, LinksMenu, PageTitle, UserInfo, UserResume } from "../../components";
import { AlertHandler } from "../../components/common/AlertHandler";
import { IoIosArrowBack } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { PiPicnicTableBold } from "react-icons/pi";
import { TablesSection } from "../../components/Profile/TablesSection";
import { RatingSection } from "../../components/Profile/RatingSection";
import { SocialNetworks } from "../../components/Profile/SocialNetworks";
import { ConnectedDevices } from "../../components/Profile/ConnectedDevices";
import { useParams } from 'react-router-dom';

export const Profile = () => {

  const { id } = useParams()
  const { iduser } = useAuth();
  const { response, isLoading, hasError, get } = useAxios();
  const [user, setUser] = useState<User>(initialUserState);

  useEffect(() => {
    get(`auth/user/${id ? id : iduser}`);
  }, [id]);

  useEffect(() => {
    if (response) {
      setUser(response?.info?.user as User);
    }
  }, [response]);


  return (
    <>
      <AlertHandler hasError={hasError} redirec={false} />
      <LinksMenu >
        <LinkButton label="Back" icon={IoIosArrowBack} />
        <LinkButton label="Dashboard" to="/admin/" icon={RxDashboard} />
        <LinkButton label="Tables" to="/admin/tables" icon={PiPicnicTableBold} />
      </LinksMenu>
      <PageTitle
        title="Profile"
        message="Permite a los usuarios ver y actualizar su información personal y contraseña."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  ">
        <UserResume user={user} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">

        <UserInfo user={user} />
        <RatingSection userId={user?.id} />
        <TablesSection />

        <ConnectedDevices />
        <SocialNetworks />
      </div>






    </>
  );
};
