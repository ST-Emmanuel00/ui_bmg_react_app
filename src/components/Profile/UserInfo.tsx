import { User } from "../../types";
import { formatDate } from "../../Utils";
import { Accordion } from "./Accordion";

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {

  return (

    <Accordion title="Personal information." isLoading={false} >

      <div className="space-y-2">
        {/* Iterar sobre las entradas del objeto 'user' */}
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Name:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.name} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Last name:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.lastName} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Document type:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.docType} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Document number:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.docNumber} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Sex:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.sex} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Email:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.email} </span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Phone number:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.phoneNumber} </span>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Birthday:</span>
          <span className="ml-1 text-gray-500 dark:text-white">
            {user?.birthday ? formatDate(user.birthday) : 'Date not available'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Status:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user.status ? "Active" : "Inactive"} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Online:</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user?.online ? "Online" : "Offline"} </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Created at:</span>
          <span className="ml-1 text-gray-500 dark:text-white">
            {user?.createdAt ? formatDate(user.createdAt) : 'Date not available'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Update at:</span>
          <span className="ml-1 text-gray-500 dark:text-white">
            {user?.updatedAt ? formatDate(user.updatedAt) : 'Date not available'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-white">Role</span>
          <span className="ml-1 text-gray-500 dark:text-white">{user?.role?.name} </span>
        </div>
      </div>

    </Accordion>
  );
};
