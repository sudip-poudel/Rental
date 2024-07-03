import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./modules/ProtectedRoutes";
import Signinpage from "./pages/Signinpage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import getUserCookies from "./helpers/getUserCookie";
import { setUser } from "./store/auth/authSlice";
import { useDispatch } from "react-redux";
import AddItem from "./pages/AddItem";
import ForgetPassword from "./pages/ForgetPassword";
import Itempage from "./pages/Itempage";
import UpdatePassword from "./pages/UpdatePassword";
import SearchResults from "./pages/SearchResults";
import useIsLoggedin from "./hooks/useIsLoggedin";
import UserProfile from "./pages/UserProfile";
import AppLayout from "./components/AppLayout";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedin = getUserCookies().token ? true : false;

    if (isLoggedin) {
      const authstate = {
        token: getUserCookies().token,
        userdata: JSON.parse(decodeURIComponent(getUserCookies().userdata)),
      };

      dispatch(setUser(authstate));
    }
    setIsLoading(false);
  }, []);
  const isLoggedin = useIsLoggedin();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <img src="/images/loaderBlack.svg" alt="loading.." />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<AppLayout />} path="/">
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                authenticationPath="/signin"
                isAuthenticated={isLoggedin}
                Component={UserProfile}
              />
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
