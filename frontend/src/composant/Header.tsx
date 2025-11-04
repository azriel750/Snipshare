import { Link } from "react-router-dom";
import "../Style/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">SnipShare</Link>
      </div>
      <nav className="header-right">
        <Link to="/snippets">Snippets</Link>
        <Link to="/create">Créer</Link>
        <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
      </nav>
    </header>
  );
}
