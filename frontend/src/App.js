import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { AuthServicesData } from './context/AuthContext';
import { SellerServicesData } from './context/SellerContext'
import { ProductServicesData } from './context/ProductContext';
import { UserServicesData } from './context/UserContext';
import { CartServicesData } from './context/CartContext';
import { CartoutServicesData } from './context/CartoutContext';
import { OrderServicesData } from './context/OrderContext';

import PrivateRoute from './components/routes/PrivateRoute';
import FallbackLoader from './components/shared/fallback-loader/FallbackLoader';

import HomePage from './views/HomePage';
import ProductPage from './views/ProductPage';
import ShopProductsPage from './views/ShopProductsPage';
import CollectionsPage from './views/CollectionsPage';
import ContactPage from './views/ContactPage';
import Error from './components/shared/error-fallback/Error';

// LAZY LOADED COMPONENTS
const SellerSignupPage = lazy(() => import('./views/seller/SellerSignupPage'));
const SellerLoginPage = lazy(() => import('./views/seller/SellerLoginPage'));
const SellerVerifyAccountPage = lazy(() => import('./views/seller/SellerVerifyAccountPage'));
const SellerForgotPasswordPage = lazy(() => import('./views/seller/SellerForgotPasswordPage'));
const SellerListingsPage = lazy(() => import('./views/seller/SellerListingsPage'));
const SellerProductPage = lazy(() => import('./views/seller/SellerProductPage'));
const SellerListProductPage = lazy(() => import('./views/seller/SellerListProductPage'));
const SellerOrdersPage = lazy(() => import('./views/seller/SellerOrdersPage'));
const SellerProfilePage = lazy(() => import('./views/seller/SellerProfilePage'));

const UserSignupPage = lazy(() => import('./views/UserSignupPage'));
const UserVerifyAccountPage = lazy(() => import('./views/UserVerifyAccountPage'));
const UserLoginPage = lazy(() => import('./views/UserLoginPage'));
const UserForgotPasswordPage = lazy(() => import('./views/UserForgotPasswordPage'));
const UserProfilePage = lazy(() => import('./views/UserProfilePage'));
const UserCartPage = lazy(() => import('./views/UserCartPage'));
const UserOrderPage = lazy(() => import('./views/UserOrderPage'));

function App() {
  return (
    <>
      <Router>
        <AuthServicesData>
          <UserServicesData>
            <SellerServicesData>
              <ProductServicesData>
                <CartServicesData>
                  <CartoutServicesData>
                    <OrderServicesData>
                      <ErrorBoundary FallbackComponent={() => <Error header={"Something went wrong, please try again"} 
                                                                      text={'LuxeSkin Haven has encountered an error. If this problem persists, please contact us at luxeskinhaven@admin.com'} 
                                                              />}>
                        <Suspense fallback={<FallbackLoader />}>
                          <Routes>
                            {/* GENERAL ROUTES */}
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/listing/:productId" element={<ProductPage />}/>
                            <Route path="/shop" element={<ShopProductsPage />}/>
                            <Route path="/shop/search-product" element={<ShopProductsPage />}/>
                            <Route path="/collections" element={<CollectionsPage />}/>
                            <Route path="/contact-us" element={<ContactPage />}/>

                            {/* SELLER PLATFORM ROUTES */}
                            <Route path="/seller/signup" element={<SellerSignupPage />}/>
                            <Route path="/seller/login" element={<SellerLoginPage />}/>
                            <Route path="/seller/verify-account" element={<SellerVerifyAccountPage />}/>
                            <Route path="/seller/forgot-password" element={<SellerForgotPasswordPage />}/>

                            {/* SELLER PROTECTED ROUTES */}
                            <Route path="/seller/:sellerId/profile" element={<PrivateRoute Component={SellerProfilePage} status={'seller'}/>}/>
                            <Route path="/seller/listings" element={<PrivateRoute Component={SellerListingsPage} status={'seller'}/>}/>
                            <Route path="/seller/listings/:productId" element={<PrivateRoute Component={SellerProductPage} status={'seller'}/>}/>
                            <Route path="/seller/list" element={<PrivateRoute Component={SellerListProductPage} status={'seller'}/>}/>
                            <Route path="/seller/orders" element={<PrivateRoute Component={SellerOrdersPage} status={'seller'}/>}/>

                            {/* USER ROUTES */}
                            <Route path="/signup" element={<UserSignupPage />}/>
                            <Route path="/verify-account" element={<UserVerifyAccountPage />}/>
                            <Route path="/login" element={<UserLoginPage />}/>
                            <Route path="/forgot-password" element={<UserForgotPasswordPage />}/>

                            {/* USER PROTECTED ROUTES */}
                            <Route path="/profile/details" element={<PrivateRoute Component={UserProfilePage} status={'user'}/>}/>
                            <Route path="/profile/orders" element={<PrivateRoute Component={UserOrderPage} status={'user'}/>}/>
                            <Route path="/cart" element={<PrivateRoute Component={UserCartPage} status={'user'}/>}/>

                            {/* PAGE NOT FOUND */}
                            <Route path="*" element={<Error header={'Page Not Found'}
                                                            text={'The page you are looking for does not exist, please try again'}/>}/>
                          </Routes>
                        </Suspense>
                      </ErrorBoundary>
                    </OrderServicesData>
                  </CartoutServicesData>
                </CartServicesData>
              </ProductServicesData>
            </SellerServicesData>
          </UserServicesData>
        </AuthServicesData>
      </Router>
    </>
  );
}

export default App;
