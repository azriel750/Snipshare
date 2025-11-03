import { useEffect, useState } from "react";
import { fetchSnippets } from "../appi";
import CreateSnippet from "../composant/CreateSnippet";
import EditSnippet from "../composant/EditSnippet";
import TagFilter from "../composant/atoms/TagFilter";

interface Snippet {
  identifiant_snippet: number;
  titre: string;
  code: string;
  langage: string;
  visibilite: "public" | "private" | "non-repertorie";
  creer_le: string;
  tags?: string[];
}

export default function Snippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [editingSnippetId, setEditingSnippetId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [langageFilter, setLangageFilter] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const loadSnippets = async (params: { q?: string; langage?: string; tag?: string } = {}) => {
    try {
      const data = await fetchSnippets(params);
      setSnippets(data);
      const allTags = Array.from(new Set(data.flatMap(s => s.tags || [])));
      setTags(allTags);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSnippets({ q: search, langage: langageFilter, tag: tagFilter || undefined });
  }, [search, langageFilter, tagFilter]);

  return (
    <div>
      <h1>Snippets</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Rechercher par titre ou code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par langage"
          value={langageFilter}
          onChange={(e) => setLangageFilter(e.target.value)}
        />
      </div>

      <TagFilter tags={tags} onSelect={(tag) => setTagFilter(tag)} />
      {tagFilter && (
        <div style={{ marginBottom: "10px" }}>
          Filtré par tag : <strong>{tagFilter}</strong>{" "}
          <button onClick={() => setTagFilter(null)}>❌ Supprimer</button>
        </div>
      )}

      <CreateSnippet onCreated={() => loadSnippets({ q: search, langage: langageFilter, tag: tagFilter || undefined })} />

      {snippets.map((s) => (
        <div key={s.identifiant_snippet} className="snippet-item">
          {editingSnippetId === s.identifiant_snippet ? (
            <EditSnippet
              snippet={s}
              onUpdated={() => loadSnippets({ q: search, langage: langageFilter, tag: tagFilter || undefined })}
              onCancel={() => setEditingSnippetId(null)}
            />
          ) : (
            <>
              <h2>
                <a href={`/snippets/${s.identifiant_snippet}`}>
                  {s.titre} ({s.langage})
                </a>
              </h2>
              <pre>{s.code}</pre>
              <small>Créé le : {new Date(s.creer_le).toLocaleString()}</small>
              <div>
                {s.tags?.map((t) => (
                  <span key={t} style={{ marginRight: 5 }}>#{t}</span>
                ))}
              </div>
              <button onClick={() => setEditingSnippetId(s.identifiant_snippet)}>Modifier</button>
              <button
                onClick={async () => {
                  if (!confirm("Supprimer ce snippet ?")) return;
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/snippets/${s.identifiant_snippet}`,
                      { method: "DELETE" }
                    );
                    if (!res.ok) throw new Error("Erreur suppression");
                    setSnippets(snippets.filter(sn => sn.identifiant_snippet !== s.identifiant_snippet));
                  } catch (err) {
                    console.error(err);
                    alert("Impossible de supprimer le snippet");
                  }
                }}
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
