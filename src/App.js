import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
//router
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const isAuthenticated = () => {
    const myCookie = Cookies.get("userNameReportTCKT", { secure: true });
    if (myCookie) {
      return true;
    } else {
      return false;
    }
  };
  // PrivateRoute component that redirects to login if the user is not authenticated
  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
      <div>
        {/* Định tuyến các trang */}
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {/* Private Route (protected) */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
