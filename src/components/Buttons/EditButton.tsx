import { User } from "../../types/User.types";
import { Alerts } from "../alerts/toast";

interface EditButtonProps {
    label: string;
    data?: User;
    onClick: (data?: User) => void;
  }
  
  export const EditButton: React.FC<EditButtonProps> = ({
    label,
    data,
    onClick,
  }) => {
    const handleEdit = () => {
      alert("edit this");
      console.log(data);
      onClick(data);
    };
  
    return (
      <button
        onClick={() => Alerts('Update User', 'dark', 'success')}
        className={`inline-flex mb-2 sm:mb-0 items-center justify-center rounded-md px-4 py-2 text-sm text-gray-100 bg-blue-500 border border-transparent hover:text-white`}
      >
        {label}
      </button>
    );
  };
  