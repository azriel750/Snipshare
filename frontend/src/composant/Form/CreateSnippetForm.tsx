import { useState } from "react";

export default function CreateSnippetForm() {
  const [titre, setTitre] = useState("");
  const [code, setCode] = useState("");
  const [langage, setLangage] = useState("");
  const [visibilite, setVisibilite] = useState("public");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/snippets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          titre,
          code,
          langage,
          visibilite,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur création snippet");
      }

      alert("✅ Snippet créé !");
      window.location.href = "/snippets";

    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="snippet-form" onSubmit={handleSubmit}>
      <label>Titre</label>
      <input
        type="text"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        required
      />

      <label>Code</label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        required
      />

      <label>Langage</label>
      <input
        type="text"
        value={langage}
        onChange={(e) => setLangage(e.target.value)}
        required
      />

      <label>Visibilité</label>
      <select
        value={visibilite}
        onChange={(e) => setVisibilite(e.target.value)}
      >
        <option value="public">Public</option>
        <option value="private">Privé</option>
        <option value="non-repertorie">Non Répertorié</option>
      </select>

      <label>Tags (séparés par des virgules)</label>
      <input
        type="text"
        placeholder="ex: react, api, node"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Création..." : "Créer le snippet"}
      </button>
    </form>
  );
}
