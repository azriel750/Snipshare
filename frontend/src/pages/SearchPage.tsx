import { useEffect, useState } from "react";
import SearchBar from "../composant/atoms/SearchBar";
import SelectLangage from "../composant/atoms/SelectLanguage";
import TagFilter from "../composant/atoms/TagFilter";
import { fetchSnippets } from "../appi";
import { Link } from "react-router-dom";
import "../Style/Explorepage.css"


export default function ExplorePage() {
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [langage, setLangage] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const load = async () => {
    const data = await fetchSnippets({
      q: query || undefined,
      langage: langage || undefined,
      tag: tag || undefined,
    });

    setSnippets(data);
    setTags(Array.from(new Set(data.flatMap((s: any) => s.tags || []))));
  };

  useEffect(() => {
    load();
  }, [query, langage, tag]);

  return (
    <div className="explore-container">

      <h1 className="explore-title">🔍 Explorer les snippets</h1>

      <div className="explore-filters">
        <SearchBar onSearch={setQuery} />
        <SelectLangage value={langage} onChange={setLangage} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <TagFilter tags={tags} onSelect={(t) => setTag(t)} />
        {tag && (
          <button className="clear-tag" onClick={() => setTag(null)}>
             retirer : {tag}
          </button>
        )}
      </div>

      <div className="explore-grid">
        {snippets.length === 0 ? (
          <p>Aucun résultat trouvé.</p>
        ) : (
          snippets.map((s: any) => (
            <Link
              key={s.identifiant_snippet}
              to={`/snippets/${s.identifiant_snippet}`}
              className="explore-card"
            >
              <h3>{s.titre}</h3>
              <p className="language">{s.langage}</p>
              <p className="date">
                {new Date(s.creer_le).toLocaleDateString()}
              </p>

              <div className="tags">
                {s.tags?.map((t: string) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
}
