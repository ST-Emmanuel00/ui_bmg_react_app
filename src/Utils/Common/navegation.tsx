import { useNavigate } from "react-router-dom";

export const navigation = (page: number = -1) => {
  const goBack = useNavigate();
  return () => goBack(page);
};
