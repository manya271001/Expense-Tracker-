import logo from './logo.svg';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Navbar from './Navbar';
import HeroSection from './Hero';
import AboutSection from './About';
import ContactPage from './ContactPage';
import Footer from './Footer';
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  return (
    <div className="App">
     {/* <Registration/> */}
     {/* <Login/> */}
     <Navbar/>
     <HeroSection/>
     <AboutSection/>
     <ContactPage/>
     <Footer/>
    </div>
  );
}

export default App;
