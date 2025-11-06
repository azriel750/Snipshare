import { useEffect, useState } from "react";
import { fetchSnippets } from "../appi";
import SnippetList from "../composant/Snippet/SnippetList"
import SearchBar from "../composant/atoms/SearchBar";
import SelectLangage from "../composant/atoms/SelectLanguage";
import TagFilter from "../composant/atoms/TagFilter";
import { Link } from "react-router-dom";

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);

  const [query, setQuery] = useState("");
  const [langage, setLangage] = useState("");
  const [tag, setTag] = useState("");

  const load = async () => {
    const data = await fetchSnippets({
      q: query || undefined,
      langage: langage || undefined,
      tag: tag || undefined
    });

    setSnippets(data);
    setTags(Array.from(new Set(data.flatMap(s => s.tags || []))));
  };

  useEffect(() => {
    load();
  }, [query, langage, tag]);

  return (
    <div className="page-container">
      <div className="header-bar">
        <h1>Snippets</h1>
        <Link to="/snippets/new" className="btn-primary">
          + Ajouter un snippet
        </Link>
      </div>

      <div className="filters">
        <SearchBar onSearch={setQuery} />
        <SelectLangage value={langage} onChange={setLangage} />
      </div>

      <TagFilter tags={tags} onSelect={setTag} />

      <SnippetList snippets={snippets} />
    </div>
  );
}
