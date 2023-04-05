import logo from './logo.svg';
import './App.scss';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './pages/ProductsPage';
import ProductViewPage from './pages/ProductViewPage';

function App() {

  const navigate = useNavigate()

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
    </div>
  );
}

export default App;
