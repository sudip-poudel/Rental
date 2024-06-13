const getUserCookies = () => {
  const cookie: {
    token: string;
    userdata: string;
  } = document.cookie.split(";").reduce(
    (ac, str) =>
      Object.assign(ac, {
        [str.split("=")[0].trim()]: str.split("=")[1],
      }),
    { token: "", userdata: "" }
  );
  return cookie;
};

export default getUserCookies;
