import logo from './logo.svg';
import './App.scss';
import LandingPage from './pages/LandingPage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './pages/ProductsPage';
import ProductViewPage from './pages/ProductViewPage';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import CartSidebar from './components/cart/CartSidebar';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { makeLoginCheckRequest, selectCustomerDetails, selectLoggedIn } from './reducers/loginSlice';
import { getCart, selectMyCart } from './reducers/cartSlice';
import CheckoutModal from './components/checkout/CheckoutModal';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { getStripePublishableKey, selectClientSecret, selectStripePromise } from './reducers/stripeSlice';
import CheckoutSuccessPage from './components/checkout/CheckoutSuccessPage';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInState = useSelector(selectLoggedIn)
  const cartState = useSelector(selectMyCart)
  const customerDetailsState = useSelector(selectCustomerDetails)
  const stripePromiseState = useSelector(selectStripePromise)
  const clientSecretState = useSelector(selectClientSecret)

 


  // Check if user is logged in already
  useEffect(() => {
    dispatch(makeLoginCheckRequest())
    dispatch(getStripePublishableKey())
  },[])

  // As soon as we get the stripe publishable key, create a payment intent
  // Receive client secret from server
  // useEffect(() => {
  //   if(!stripePromiseState) return

  // },[stripePromiseState])


  // Immediately get customer's cart if they are logged in
  useEffect(() => {
    dispatch(getCart(customerDetailsState._id))
  },[loggedInState])

  const appearance = {
    theme: 'stripe',
  };


  // We need to wait for the client secret to be received from the server
  // before we can render the checkout modal
  // How do we make the checkout modal wait for the client secret?
  // We can't use a useEffect because it will run every time the client secret changes
  // We can't use a conditional render because the client secret is null at first
  // We can't use a ternary operator because the client secret is null at first
  // We can't use a logical operator because the client secret is null at first
  // We can't use a nullish coalescing operator because the client secret is null at first
  // We can't use a short circuit operator because the client secret is null at first
  // We can't use a nullish coalescing operator because the client secret is null at first
  // So what can we use?
  // How do you synthesize solutions to problems with copilot?
  // What's the shortcut to synthesizing solutions to problems with copilot?

  const options = {
    clientSecret: clientSecretState,
    appearance,
  }


  const MainSiteLayout = () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }

  const LandingLayout = () => {
    return (
      <div>
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />  
        </Route>
        <Route path="/" element={<MainSiteLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductViewPage />} />
            <Route path="/thankyou" element={<CheckoutSuccessPage />} />
        </Route>
      </Routes>
      <LoginModal />
      <RegisterModal />
      {clientSecretState && (
        <Elements stripe={stripePromiseState} options={options}>
          <CheckoutModal />
        </Elements>
      )}
      
      <CartSidebar />
    </div>
  );
}

export default App;
