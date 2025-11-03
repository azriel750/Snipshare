import { useState } from "react";
import EditSnippet from "./EditSnippet";

interface SnippetItemProps {
  snippet: any;
  onUpdated: () => void;
  onDelete: (id: number) => void;
  onTagClick: (tagName: string) => void;
}

export default function SnippetItem({ snippet, onUpdated, onDelete, onTagClick }: SnippetItemProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="snippet-item">
      {editing ? (
        <EditSnippet
          snippet={snippet}
          onUpdated={() => { onUpdated(); setEditing(false); }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <h2>
            <a href={`/snippets/${snippet.identifiant_snippet}`}>
              {snippet.titre} ({snippet.langage})
            </a>
          </h2>
          <pre>{snippet.code}</pre>
          <small>Créé le : {new Date(snippet.creer_le).toLocaleString()}</small>
          <div className="tags mt-2">
            {snippet.tags?.map((t: any) => (
              <span
                key={t.identifiant_tag}
                className="tag cursor-pointer bg-gray-700 px-2 py-1 rounded mr-1"
                onClick={() => onTagClick(t.name)}
              >
                {t.name}
              </span>
            ))}
          </div>
          <br />
          <button onClick={() => setEditing(true)}>Modifier</button>
          <button onClick={() => onDelete(snippet.identifiant_snippet)}>Supprimer</button>
        </>
      )}
    </div>
  );
}
