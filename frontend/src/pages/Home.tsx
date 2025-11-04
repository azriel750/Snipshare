import { useEffect, useState } from "react";
import { fetchSnippets } from "../appi";
import { Link } from "react-router-dom";
import "../Style/Home.css";

export default function Home() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    loadLatest();
  }, []);

  const loadLatest = async () => {
    const data = await fetchSnippets();
    setLatest(data.slice(0, 5));
  };

  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">Partagez,créer et visionnez vos snippets simplement !</h1>
        <p className="hero-subtitle">
         Stockez, commentez et réutilisez vos bouts de code en toute sécurité.
        </p>

        <div className="hero-buttons">
          <Link to="/snippets" className="btn-primary">Modifier son Profil ?</Link>
        </div>
      </section>
      <section className="section-latest">
        <h2>📌 Snippets récents</h2>

        {latest.length === 0 ? (
          <p>Aucun snippet pour le moment...</p>
        ) : (
          <div className="latest-list">
            {latest.map((s: any) => (
              <Link
                to={`/snippets/${s.identifiant_snippet}`}
                key={s.identifiant_snippet}
                className="snippet-card"
              >
                <h3>{s.titre || "(Sans titre)"}</h3>
                <p className="lang">{s.langage}</p>
                <p className="date">
                  {new Date(s.creer_le).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
