import SnippetCard from "./SnippetCard";

export default function SnippetList({ snippets }) {
  return (
    <div className="snippet-grid">
      {snippets.map(s => (
        <SnippetCard key={s.identifiant_snippet} snippet={s} />
      ))}
    </div>
  );
}
