import { useState } from "react";

interface EditSnippetProps {
  snippet: {
    identifiant_snippet: number;
    titre: string;
    code: string;
    langage: string;
    visibilite: "public" | "private" | "non-repertorie";
  };
  onUpdated: () => void;
  onCancel: () => void;
}

export default function EditSnippet({ snippet, onUpdated, onCancel }: EditSnippetProps) {
  const [titre, setTitre] = useState(snippet.titre);
  const [code, setCode] = useState(snippet.code);
  const [langage, setLangage] = useState(snippet.langage);
  const [visibilite, setVisibilite] = useState(snippet.visibilite);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/snippets/${snippet.identifiant_snippet}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ titre, code, langage, visibilite }),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      onUpdated(); 
      onCancel(); 
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour le snippet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <input
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        placeholder="Titre"
        required
      />
      <input
        value={langage}
        onChange={(e) => setLangage(e.target.value)}
        placeholder="Langage"
        required
      />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
        required
      />
           <input
  placeholder="Tags séparés par virgule (ex: js, react)"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
/>
      <select value={visibilite} onChange={(e) => setVisibilite(e.target.value)}>
        <option value="public">Public</option>
        <option value="private">Privé</option>
        <option value="non-repertorie">Non répertorié</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Mise à jour..." : "Mettre à jour"}
      </button>
      <button type="button" onClick={onCancel} disabled={loading}>
        Annuler
      </button>
    </form>
  );
}
