import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./modules/ProtectedRoutes";
import Signinpage from "./pages/Signinpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" Component={Signinpage} />
      </Routes>
    </>
  );
}

export default App;
