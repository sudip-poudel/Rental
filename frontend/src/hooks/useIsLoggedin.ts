import { RootState } from "@/types/types";
import { useSelector } from "react-redux";

const useIsLoggedin = (): boolean => {
  const user = useSelector((state: RootState) => state.auth.userToken);
  if (user) return true;
  return false;
};

export default useIsLoggedin;
