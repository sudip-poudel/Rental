import { fetchCurrentUserDetails } from "@/api/userApi";

const getUserCookies = async () => {
  const data = await fetchCurrentUserDetails();
  return { id: data.id, name: data.name, email: data.email };
};

export default getUserCookies;
