import { User } from "../../types/User.types";
import { Alerts } from "../../Utils";
interface DeleteButtonProps {
  label: string;
  data?: User;
  onClick: (data?: User) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ label, data }) => {
  const handleDelete = () => {
    alert("delete this");
    console.log(data);
  };
  return (
    <button
      onClick={handleDelete}
      className={`inline-flex mb-2 sm:mb-0 items-center justify-center rounded-md px-4 py-2 text-sm text-gray-100 bg-red-500 border border-transparent hover:text-white`}
    >
      {label}
    </button>
  );
};

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
    Alerts
    console.log(data);
    onClick(data);
  };

  return (
    <button
      onClick={handleEdit}
      className={`inline-flex mb-2 sm:mb-0 items-center justify-center rounded-md px-4 py-2 text-sm text-gray-100 bg-blue-500 border border-transparent hover:text-white`}
    >
      {label}
    </button>
  );
};
