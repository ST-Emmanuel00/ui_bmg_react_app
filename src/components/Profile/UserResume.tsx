import { ProfileInfoItem } from "./ProfileInfoItem";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaCamera, FaUser } from "react-icons/fa";
import { User } from "../../types";
import { capitalizeFirstLetter } from "../../Utils";
import { Container } from "../common/Container";

interface UserInfoProps {
  user: User;
  isLoading: boolean;
}

export const UserResume: React.FC<UserInfoProps> = ({ user, isLoading }) => {
  const { name, lastName, email, phoneNumber, status, role = { name } } = user;
  const { name: roleName = "Role" } = role;


  return (
    <>
      <Container isLoading={isLoading}>
        {/* Información resumida del usuario */}
        <div className="flex my-4 flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 w-full">
          {/* Avatar */}
          <div className="relative h-20 w-20 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-full">
            <FaUser size={30} className="text-slate-300 dark:text-slate-700" />
            {/* Cámara */}
            <label htmlFor="file-upload" className="absolute bottom-0 right-0">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-dark">
                <FaCamera />
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              // onChange={handleProfilePictureChange}
              accept="image/*"
            />
          </div>

          {/* Info del usuario */}
          <div className="flex-grow text-center sm:text-left">
            {/* Mantener h1 y el estado al lado */}
            <div className="flex items-center">
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                {`${name} ${lastName}`}
              </h1>
              <span
                className={`ml-2 h-3 w-3 rounded-full ${status ? "bg-green-500" : "bg-red-500"
                  } dark:bg-slate-700`}
              ></span>
            </div>

            <p className="text-sm text-start text-slate-600 dark:text-slate-400">
              {capitalizeFirstLetter(roleName)}
            </p>
            <ProfileInfoItem icon={<FiMail />} value={email} />
            <ProfileInfoItem icon={<FiPhone />} value={phoneNumber} />
          </div>
        </div>
      </Container>
    </>
  );
};
