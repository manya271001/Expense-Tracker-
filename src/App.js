import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Registration from "./Registration";
import Login from "./Login";
import HeroSection from "./Hero";
import AboutSection from "./About";
import ContactPage from "./ContactPage";
import Dashboard from "./Dashboard";
import AddGroup from "./AddGroup";

function App() {
  return (
    
      <Routes>
        {/* Routes without Navbar & Footer */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HeroSection />} />

        {/* Routes with Navbar & Footer */}
        <Route element={<Layout />}>
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/addgroup" element={<AddGroup/>} />
        </Route>
      </Routes>
    
  );
}

export default App;
