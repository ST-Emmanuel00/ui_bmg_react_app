// src/components/Welcome.tsx
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAxios } from "../../Hooks";
import { useEffect } from "react";
import { NotFound } from "./Notfound";
import { AlertHandler } from "../../components";

export const Welcome = () => {
  const { response, get, hasError } = useAxios();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    get(`auth/verify-email/${token}`);
  }, [token]);

  return (
    <>
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-yellow-600 overflow-hidden">
      <AlertHandler response={response} hasError={hasError} redirec={false} />
      {response ? (
        <main className="flex flex-col items-center text-center">
          <h1
            className={`text-8xl font-bold mb-4 font-anton transition-colors duration-500 ease-in-out hover:text-[#EAB308] ${
              response ? "text-red-800" : "text-blue-800"
            }`}
          >
            Welcome
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 font-anton text-slate-800 transition-colors duration-500 ease-in-out hover:text-[#EAB308]">
            to Barmanager
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-8 text-slate-500 transition-colors duration-500 ease-in-out hover:text-[#EAB308]">
            Step into the world of managing your bar like never before.
          </p>

          <Link
            to="/"
            className="bg-yellow-500 text-white hover:bg-yellow-400 transition-colors duration-500 ease-in-out shadow-sm rounded-md px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 font-medium"
          >
            Log in
          </Link>
        </main>
      ) : (
        <NotFound />
      )}
    </div>
    </>
  );
};
