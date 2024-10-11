import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../Hooks/useAuth';
import { useAxios } from "../../Hooks";
import { AlertHandler, Input } from "../../components";
import { MdEmail, MdLock, MdPassword } from "react-icons/md";
import { useForm } from "react-hook-form";
import logobmg from '../../assets/logobmg.png';
import loginbmg from '../../assets/login.png';

export const LogIn = () => {
  const { setIduser, setToken, setRoleId, iduser, token, RoleId } = useAuth();
  const { post, response, hasError } = useAxios();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  useEffect(() => {
    setError(null);
    if (response) {
      setIduser(response.info.id as string);
      setToken(response.info.token as string);
      setRoleId(response.info.roleId as string);

      localStorage.setItem('iduser', iduser);
      localStorage.setItem('token', token);
      localStorage.setItem('RoleId', RoleId);

    }

  }, [response])

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const isSucces = await post("auth/login", { email, password });
    if (isSucces) {
      setTimeout(() => {
        navigate("/admin");
      }, 50);
    }
  }

  return (
    <>
      <AlertHandler response={response} hasError={hasError} redirec={false} />
      <div className="h-screen w-screen  flex items-center justify-center bg-cover bg-center bg-login">
        <div className="w-full max-w-4xl h-full lg:h-auto bg-white shadow-lg lg:rounded-2xl flex flex-col lg:flex-row overflow-hidden">
          <div className="hidden lg:block w-1/2 bg-top-full bg-center bg-no-repeat " style={{ backgroundImage: `url(${loginbmg})` }}>
            {/* Imagen de fondo para pantallas grandes */}
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-center h-screen lg:h-auto">
            <div className="flex items-center mb-8" style={{ backgroundImage: `url(${logobmg})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', width: 'auto', height: '3rem' }}>
              <h2 className="text-4xl text-black font-bold pl-16">Login</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {error && <div className="mb-4 text-red-500 text-center text-sm">{error}</div>}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                  <MdEmail className="absolute text-gray-900 left-3 top-1/2 transform -translate-y-1/2 " />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    register={{ ...register('email') }}
                    response={response}
                    hasError={hasError}
                    icon={<MdEmail className="text-gray-900" />}
                    liveErrors={[]}
                    className="w-60 pl-10 pr-4 py-3 border text-gray-900 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg" />
                </div>

                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    register={{ ...register('password') }}
                    response={response}
                    hasError={hasError}
                    icon={<MdPassword className="text-gray-900" />}
                    liveErrors={[]}
                    className="w-60 pl-10 pr-4 py-3 border text-gray-900 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg" />
                </div>

                <button
                  type="submit"
                  className="w-full lg:w-60  bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-full shadow-xl"
                >
                  Start
                </button>
                <div className="text-center mt-4">
                  <Link to="password-reset" className="text-yellow-500 hover:text-yellow-600">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
