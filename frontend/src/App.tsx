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
import useIsLoggedin from "./hooks/useIsLoggedin";
import AddItem from "./pages/AddItem";
import ForgetPassword from "./pages/ForgetPassword";
import Itempage from "./pages/Itempage";
import UpdatePassword from "./pages/UpdatePassword";
import SearchResults from "./pages/SearchResults";

function App() {
  const dispatch = useDispatch();
  const isLoggedin = useIsLoggedin();

  useEffect(() => {
    const isLoggedin = getUserCookies().token ? true : false;

    if (isLoggedin) {
      const authstate = {
        token: getUserCookies().token,
        userdata: JSON.parse(decodeURIComponent(getUserCookies().userdata)),
      };

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
              isAuthenticated={isLoggedin}
              Component={Dashboard}
            />
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute
              authenticationPath="/signin"
              isAuthenticated={isLoggedin}
              Component={AddItem}
            />
          }
        />
        <Route path="/itempage/:id" element={<Itempage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route
          path="/searchresults"
          element={
            <ProtectedRoute
              authenticationPath="/signin"
              isAuthenticated={isLoggedin}
              Component={SearchResults}
            />
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
