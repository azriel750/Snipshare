import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Style/Navbar.css";

interface NavbarProps {
  // tags?: string[];
  // onFilter?: (filters: { q?: string; langage?: string; tag?: string }) => void;
}

export default function Navbar({}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          SnipShare
        </Link>

        <div className="links">
          <Link to="/snippets">Snippets</Link>

          {isLogged ? (
            <>
              <Link to="/profile">Profil</Link>
              <button onClick={logout} className="logout-btn">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Connexion
              </Link>
              <Link to="/register" className="register-btn">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>

      <Link to="/explore" className="nav-icon">
        🔍
      </Link>

      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
    </nav>
  );
}
