import logo from './logo.svg';
import './App.scss';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

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
        <Route path="/home" element={<MainSiteLayout />}>
            <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
