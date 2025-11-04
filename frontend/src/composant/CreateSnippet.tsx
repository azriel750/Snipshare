import { useState } from "react";

export default function CreateSnippet({ onCreated }: { onCreated: () => void }) {
  const [titre, setTitre] = useState("");
  const [code, setCode] = useState("");
  const [langage, setLangage] = useState("");
  const [visibilite, setVisibilite] = useState("public");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/snippets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, code, langage, visibilite }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      setTitre("");
      setCode("");
      setLangage("");
      setVisibilite("public");

      onCreated();
    } catch (err) {
      console.error(err);
      alert("Impossible de créer le snippet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <input
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        required
      />
      <input
        placeholder="Langage"
        value={langage}
        onChange={(e) => setLangage(e.target.value)}
        required
      />
      <textarea
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <select value={visibilite} onChange={(e) => setVisibilite(e.target.value)}>
        <option value="public">Public</option>
        <option value="private">Privé</option>
        <option value="non-repertorie">Non répertorié</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Création..." : "Créer Snippet"}
      </button>
    </form>
  );
}
