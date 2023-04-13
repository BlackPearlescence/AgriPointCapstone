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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { makeLoginCheckRequest, selectCustomerDetails, selectLoggedIn } from './reducers/loginSlice';
import { getCart } from './reducers/cartSlice';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInState = useSelector(selectLoggedIn)
  const customerDetailsState = useSelector(selectCustomerDetails)


  // Check if user is logged in already
  useEffect(() => {
    dispatch(makeLoginCheckRequest())
  },[])


  // Immediately get customer's cart if they are logged in
  useEffect(() => {
    dispatch(getCart(customerDetailsState._id))
  },[loggedInState])


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
        </Route>
      </Routes>
      <LoginModal />
      <RegisterModal />
      <CartSidebar />
    </div>
  );
}

export default App;
