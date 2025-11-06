import { useEffect, useState } from "react";

interface Props {
  snippetId: number;
}

export default function EditSnippetForm({ snippetId }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [titre, setTitre] = useState("");
  const [code, setCode] = useState("");
  const [langage, setLangage] = useState("");
  const [visibilite, setVisibilite] = useState("public");
  const [tags, setTags] = useState("");

  useEffect(() => {
    loadSnippet();
  }, []);

  const loadSnippet = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/snippets/${snippetId}`);
      const data = await res.json();

      setTitre(data.titre);
      setCode(data.code);
      setLangage(data.langage);
      setVisibilite(data.visibilite);
      setTags((data.tags || []).join(", "));

    } catch (err) {
      console.error(err);
      alert("Erreur lors du chargement du snippet.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/snippets/${snippetId}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error("Erreur sauvegarde");

      alert("✅ Snippet mis à jour !");
      window.location.href = `/snippets/${snippetId}`;

    } catch (err) {
      console.error(err);
      alert("Impossible de sauvegarder.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <form className="snippet-form" onSubmit={handleSave}>
      <label>Titre</label>
      <input value={titre} onChange={(e) => setTitre(e.target.value)} />

      <label>Code</label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
      />

      <label>Langage</label>
      <input value={langage} onChange={(e) => setLangage(e.target.value)} />

      <label>Visibilité</label>
      <select value={visibilite} onChange={(e) => setVisibilite(e.target.value)}>
        <option value="public">Public</option>
        <option value="private">Privé</option>
        <option value="non-repertorie">Non Répertorié</option>
      </select>

      <label>Tags</label>
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="react, ts, express"
      />

      <button type="submit" disabled={saving}>
        {saving ? "Sauvegarde..." : "Mettre à jour"}
      </button>
    </form>
  );
}
