import Ancord from "./Ancord";
import { IconType } from "react-icons";
import { MdErrorOutline } from "react-icons/md";

interface LinkNavbarProps {
  ICON: IconType; 
}

const LinkNavbar: React.FC<LinkNavbarProps> = () => {
  return (
    <li>
      <Ancord
        handleClick={() => {}}
        link="https://docs.google.com/forms/d/e/1FAIpQLSdKeUBjVheimfkk-SuWmo6BMmhpZZZaEQWLo7TUzMvdAz0_-w/viewform?usp=sf_link"
        message="Are you sure you want to go to this link?" 
        paragraph="Here you can add additional information or details about what will happen if you choose to proceed."  
      >
        <MdErrorOutline className="text-xl" />
      </Ancord>
    </li>
  );
};

export default LinkNavbar;
