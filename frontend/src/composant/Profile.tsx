import { useEffect, useState } from "react";
import { fetchSnippets } from "../appi";

interface Snippet {
  identifiant_snippet: number;
  titre: string;
  code: string;
  langage: string;
  visibilite: "public" | "private" | "non-repertorie";
  creer_le: string;
}

export default function Profile() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stats, setStats] = useState({ totalSnippets: 0, totalLikes: 0 });

  const loadSnippets = async () => {
    try {
      const data = await fetchSnippets({}); 
      setSnippets(data);
      setStats(prev => ({ ...prev, totalSnippets: data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  const handleEmailUpdate = async () => {
    try {
      alert("Email mis à jour (simulation)");
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour l'email");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      alert("Mot de passe mis à jour (simulation)");
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour le mot de passe");
    }
  };

  return (
    <div className="profile-page">
      <h1>Profil</h1>

      <section className="stats">
        <p>Snippets créés : {stats.totalSnippets}</p>
        <p>Likes reçus : {stats.totalLikes}</p>
      </section>

      <section className="account">
        <h2>Modifier mon email</h2>
        <input 
          type="email" 
          placeholder="Nouvel email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={handleEmailUpdate}>Mettre à jour</button>

        <h2>Modifier mon mot de passe</h2>
        <input 
          type="password" 
          placeholder="Nouveau mot de passe" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
        />
        <button onClick={handlePasswordUpdate}>Mettre à jour</button>
      </section>

      <section className="user-snippets">
        <h2>Mes Snippets</h2>
        {snippets.map((s) => (
          <div key={s.identifiant_snippet} className="snippet-item">
            <h3>{s.titre} ({s.langage})</h3>
            <pre>{s.code}</pre>
            <small>Créé le : {new Date(s.creer_le).toLocaleString()}</small>
          </div>
        ))}
      </section>
    </div>
  );
}
