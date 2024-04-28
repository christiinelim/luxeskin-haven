import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellerSignupPage from './views/seller/SellerSignupPage';
import HomePage from './views/HomePage';
import ProductPage from './views/ProductPage';
import SellerLoginPage from './views/seller/SellerLoginPage';
import SellerVerifyAccountPage from './views/seller/SellerVerifyAccountPage';
import { SellerServicesData } from './context/SellerContext'
import SellerProfilePage from './views/seller/SellerProfilePage';
import SellerForgotPasswordPage from './views/seller/SellerForgotPasswordPage';
import { AuthData } from './context/AuthContext';
import SellerListingsPage from './views/seller/SellerListingsPage';
import { ProductServicesData } from './context/ProductContext';
import SellerProductPage from './views/seller/SellerProductPage';
import SellerListProductPage from './views/seller/SellerListProductPage';

function App() {
  return (
    <>
      <Router>
        <AuthData>
          <SellerServicesData>
            <ProductServicesData>
              <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/seller/signup" element={<SellerSignupPage />}/>
                <Route path="/seller/login" element={<SellerLoginPage />}/>
                <Route path="/seller/verify-account" element={<SellerVerifyAccountPage />}/>
                <Route path="/seller/forgot-password" element={<SellerForgotPasswordPage />}/>
                <Route path="/seller/:sellerId/profile" element={<SellerProfilePage />}/>
                <Route path="/listings" element={<SellerListingsPage />}/>
                <Route path="/listings/:productId" element={<SellerProductPage />}/>
                <Route path="/list" element={<SellerListProductPage />}/>
                <Route path="/listing/:productId" element={<ProductPage />}/>
              </Routes>
            </ProductServicesData>
          </SellerServicesData>
        </AuthData>
      </Router>
    </>
  );
}

export default App;
