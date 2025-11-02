import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Prediction from "./pages/Prediction";
import About from "./pages/About";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/upload" element={<Upload />} />
        <Route path="/predict" element={<Prediction />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
