import { useLocation } from "react-router-dom";

export const useAppLocation = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  return {
    location,
    paths: pathSegments,
  };
};
