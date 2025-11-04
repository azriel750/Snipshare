import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./composant/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Snippets from "./pages/Snippets";
import ProfilePage from "./pages/ProfilePage";
import SnippetDetail from "./pages/SnippetDetail";
import Footer from "./composant/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
          
        </Routes>
      </div>
      <Footer/>
    </Router>
    
  );
}

export default App;
