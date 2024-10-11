import { ReactNode } from "react";
import { FiMail } from "react-icons/fi";

interface ProfileInfoItemProps {
  value: string;
  icon: ReactNode;
}

export const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  value = "emanuel@example.com",
  icon = <FiMail />,
}) => {
  return (
    <div className="flex items-center space-x-2 mt-1">
      {icon}
      {/* <span className="text-sm font-medium text-gray-700">{label}:</span> */}
      <span className="text-sm text-gray-600">{value}</span>
    </div>
  );
};
