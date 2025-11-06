import { useParams } from "react-router-dom";
import EditSnippetForm from "../composant/Form/EditSnippetForm";


export default function EditSnippetPage() {
  const { id } = useParams();

  if (!id) return <p>Snippet introuvable.</p>;

  return (
    <div className="page-container">
      <h1>Modifier le snippet</h1>
      <EditSnippetForm snippetId={Number(id)} />
    </div>
  );
}
