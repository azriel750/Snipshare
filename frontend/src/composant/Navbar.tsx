import { Link } from "react-router-dom";
import { useState } from "react";
import SearchFilter from "./atoms/SearchBar";
import "../Style/Navbar.css"

interface NavbarProps {
  tags: string[];
  onFilter: (filters: { q?: string; langage?: string; tag?: string }) => void;
}

export default function Navbar({ tags, onFilter }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          SnipShare
        </Link>
        <div className="links">
          <Link to="/snippets">Snippets</Link>
          <Link to="/profile">Profil</Link>
        </div>
      </div>

      <div className="navbar-right">
        <SearchFilter
          tags={tags}
          langages={["javascript","typescript","python","php","c#","c++"]}
          onFilter={onFilter}
        />
      </div>

      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
    </nav>
  );
}
