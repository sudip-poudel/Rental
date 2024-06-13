import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./modules/ProtectedRoutes";
import Signinpage from "./pages/Signinpage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import getUserCookies from "./helpers/getUserCookie";
import { setUser } from "./store/auth/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedin = getUserCookies().token ? true : false;
    console.log(isLoggedin);

    if (isLoggedin) {
      const authstate = {
        token: getUserCookies().token,
        userdata: JSON.parse(decodeURIComponent(getUserCookies().userdata)),
      };
      console.log("loggedin");
      console.log(
        {
          userdata: JSON.parse(decodeURIComponent(getUserCookies().userdata)),
          token: getUserCookies().token,
        },
        "data"
      );
      dispatch(setUser(authstate));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" Component={Signinpage} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              authenticationPath="/signin"
              isAuthenticated={false}
              Component={Dashboard}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
