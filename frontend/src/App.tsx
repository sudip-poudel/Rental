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
import UserSetting from "./pages/UserSetting";
import "@smastrom/react-rating/style.css";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardListed from "./pages/Dashboard/DashboardListed";
import DashboardRented from "./pages/Dashboard/DashboardRented";
import DashboardEarnings from "./pages/Dashboard/DashboardEarnings";
function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const isLoggedin = await getUserCookies();

      if (isLoggedin.id) {
        const authstate = {
          userdata: {
            id: isLoggedin.id,
            name: isLoggedin.name,
            email: isLoggedin.email,
          },
        };

        dispatch(setUser(authstate));
      }
    }
    getUser();
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
          <Route element={<DashboardLayout />} path="/dashboard">
            <Route
              index
              element={
                <ProtectedRoute
                  authenticationPath="/signin"
                  isAuthenticated={isLoggedin}
                  Component={Dashboard}
                />
              }
            />

            <Route
              path="rented"
              element={
                <ProtectedRoute
                  authenticationPath="/signin"
                  isAuthenticated={isLoggedin}
                  Component={DashboardRented}
                />
              }
            />
            <Route
              path="listed"
              element={
                <ProtectedRoute
                  authenticationPath="/signin"
                  isAuthenticated={isLoggedin}
                  Component={DashboardListed}
                />
              }
            />
            <Route
              path="earnings"
              element={
                <ProtectedRoute
                  authenticationPath="/signin"
                  isAuthenticated={isLoggedin}
                  Component={DashboardEarnings}
                />
              }
            />
          </Route>
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
            path="/searchresults/:searchterm"
            element={
              <ProtectedRoute
                authenticationPath="/signin"
                isAuthenticated={isLoggedin}
                Component={SearchResults}
              />
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute
                authenticationPath="/signin"
                isAuthenticated={isLoggedin}
                Component={UserProfile}
              />
            }
          />
          <Route
            path="/usersetting"
            element={
              <ProtectedRoute
                authenticationPath="/signin"
                isAuthenticated={isLoggedin}
                Component={UserSetting}
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
