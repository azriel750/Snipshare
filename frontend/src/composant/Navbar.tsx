import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>🔮 SnipShare</h2>
      <div>
        <Link to="/">Accueil</Link>
        <Link to="/snippets">Snippets</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Déconnexion</button>
        )}
      </div>
    </nav>
  );
}
