import { Link } from "react-router-dom";

export default function SnippetCard({ snippet }) {
  return (
    <Link to={`/snippets/${snippet.identifiant_snippet}`} className="snippet-card">
      <h3>{snippet.titre}</h3>
      <p className="lang">{snippet.langage}</p>
      <p className="date">{new Date(snippet.creer_le).toLocaleDateString()}</p>

      <div className="tags">
        {snippet.tags?.map(t => (
          <span key={t}>#{t}</span>
        ))}
      </div>
    </Link>
  );
}
