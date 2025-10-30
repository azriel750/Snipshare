import { useEffect, useState } from "react";
import { fetchSnippets } from "../appi";
import CreateSnippet from "../composant/CreateSnippet";
import EditSnippet from "../composant/EditSnippet";




interface Snippet {
  identifiant_snippet: number;
  titre: string;
  code: string;
  langage: string;
  visibilite: "public" | "private" | "non-repertorie";
  creer_le: string;
}

function Snippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [editingSnippetId, setEditingSnippetId] = useState<number | null>(null);

  const loadSnippets = () => {
    fetchSnippets()
      .then((data) => setSnippets(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <div>
      <h1>Snippets</h1>


      <CreateSnippet onCreated={loadSnippets} />


      {snippets.map((s) => (
        <div key={s.identifiant_snippet} className="snippet-item">
          {editingSnippetId === s.identifiant_snippet ? (
            <EditSnippet
              snippet={s}
              onUpdated={loadSnippets}
              onCancel={() => setEditingSnippetId(null)}
            />
          ) : (
            <>
              <h2>{s.titre} ({s.langage})</h2>
              <pre>{s.code}</pre>
              <small>Créé le : {new Date(s.creer_le).toLocaleString()}</small>
              <br />
              <button onClick={() => setEditingSnippetId(s.identifiant_snippet)}>
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Supprimer ce snippet ?")) return;
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/snippets/${s.identifiant_snippet}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
                        },
                      }
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

export default Snippets;