import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Snippets from "./pages/Snippets";
import ProfilePage from "./pages/ProfilePage";
import SnippetDetail from "./pages/SnippetDetail";
import Footer from "./composant/Footer";
import { fetchSnippets } from "./appi";
import Navbar from "./composant/Navbar";
import ExplorePage from "./pages/SearchPage";
import CreateSnippetPage from "./pages/CreateSnippet";
import EditSnippetPage from "./pages/EditSnippetPage";

function App() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const loadSnippets = async (filters: { q?: string; langage?: string; tag?: string } = {}) => {
    const data = await fetchSnippets(filters);
    setSnippets(data);
    const allTags = Array.from(new Set(data.flatMap(s => s.tags || [])));
    setTags(allTags);
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <Router>
      <Navbar tags={tags} onFilter={loadSnippets} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snippets" element={<Snippets snippets={snippets} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/snippets/new" element={<CreateSnippetPage />} />
          <Route path="/snippets/:id/edit" element={<EditSnippetPage />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
