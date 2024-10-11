import image from "../../assets/glass.png";
import "react-toastify/dist/ReactToastify.css";
import { LinkButton } from "../../components";
import { IoIosArrowBack } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";

export const NotFound = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />
      <div className="w-full h-screen bg-wave bg-no-repeat bg-cover bg-center flex flex-col md:flex-row overflow-auto dark:bg-none">
        {/* DIV IZQUIERDO */}
        <div className="flex-1 flex bg-transparent flex-col justify-center items-center text-center">
          <div className="w-auto">
            <h1 className="font-anton text-customRed not-italic text-6xl mt-8">
              404{" "}
              <span className="text-stle text-black dark:text-white">
                Error
              </span>
            </h1>
            <span className="font-anton text-black mt-8 text-6xl block dark:text-white">
              Page not found
            </span>
            <p className="mt-8 text-black text-2xl block mb-10 dark:text-white">
              You have left the bar, you can't drink here
            </p>
            
            {/* Centro el botón aquí */}
            <div className="flex justify-center mt-4">
              <LinkButton label="Back" icon={IoIosArrowBack} />
              <LinkButton label="Login" type="yellow" icon={LuLogIn} to="/" />

            </div>
          </div>
        </div>
        {/* DIV DERECHO */}
        <div className="flex-1 bg-transparent italic flex flex-col justify-center text-center p-8 md:mt-8 md:ml-4">
          <img src={image} alt="Imagen" className="md:ml-[-50px]" />
        </div>
      </div>
    </>
  );
};
