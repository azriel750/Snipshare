import { useState } from "react";

interface Props {
  tags: string[];
  langages: string[];
  onFilter: (filters: { q?: string; langage?: string; tag?: string }) => void;
}

export default function SearchFilter({ tags, langages, onFilter }: Props) {
  const [q, setQ] = useState("");
  const [langage, setLangage] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ q: q || undefined, langage: langage || undefined, tag: tag || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="search-filter">
      <input
        type="text"
        placeholder="Rechercher un snippet..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <select value={langage} onChange={(e) => setLangage(e.target.value)}>
        <option value="">Tous les langages</option>
        {(langages ?? []).map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="">Tous les tags</option>
        {(tags ?? []).map(t => (
          <option key={t} value={t}>
            #{t}
          </option>
        ))}
      </select>

      <button type="submit">Filtrer</button>
    </form>
  );
}
