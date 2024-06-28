import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const UpdatePassword = () => {
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");
  console.log(token);

  console.log(searchParam);

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password update logic
  };

  if (!token) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
