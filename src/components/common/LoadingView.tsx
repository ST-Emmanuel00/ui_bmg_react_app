import { Spinner } from "./Spinner";

export const LoadingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-slate-900">
      <img
        src={"../src/assets/logobmg.png"}
        alt="App Logo"
        className="w-48 h-48 mb-4"
      />
      <Spinner width="48" height="48" color="#9e3030" />
    </div>
  );
};
