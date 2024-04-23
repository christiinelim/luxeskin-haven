import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellerSignupPage from './views/seller/SellerSignupPage';
import HomePage from './views/HomePage';
import SellerLoginPage from './views/seller/SellerLoginPage';
import SellerVerifyAccountPage from './views/seller/SellerVerifyAccountPage';
import { SellerServicesData } from './context/SellerServicesContext'
import SellerProfilePage from './views/seller/SellerProfilePage';
import SellerForgotPasswordPage from './views/seller/SellerForgotPasswordPage';

function App() {
  return (
    <>
      <Router>
        <SellerServicesData>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/seller/signup" element={<SellerSignupPage />}/>
            <Route path="/seller/login" element={<SellerLoginPage />}/>
            <Route path="/seller/verify-account" element={<SellerVerifyAccountPage />}/>
            <Route path="/seller/profile/:sellerId" element={<SellerProfilePage />}/>
            <Route path="/seller/forgot-password" element={<SellerForgotPasswordPage />}/>
          </Routes>
        </SellerServicesData>
      </Router>
    </>
  );
}

export default App;
