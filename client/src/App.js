import logo from './logo.svg';
import './App.scss';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage/>
      <Footer />
    </div>
  );
}

export default App;
