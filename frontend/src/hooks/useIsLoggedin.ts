import getUserCookies from "@/helpers/getUserCookie";

const useIsLoggedin = (): boolean => {
  const user = getUserCookies();
  if (user.token) return true;
  return false;
};

export default useIsLoggedin;
