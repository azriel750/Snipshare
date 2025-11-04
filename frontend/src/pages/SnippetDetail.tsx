import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";


export default function SnippetDetail() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    loadSnippet();
    loadComments();
    loadLikes();
  }, [id]);

  const loadSnippet = async () => {
    const res = await api.get(`/snippets/${id}`);
    setSnippet(res.data);
  };

  const loadComments = async () => {
    const res = await api.get(`/comments/snippet/${id}`);
    setComments(res.data);
  };

  const loadLikes = async () => {
    const res = await api.get(`/likes/count/${id}`);
    setLikeCount(res.data.count);
  };

  const sendComment = async () => {
    if (!newComment.trim()) return;
    await api.post("/comments", {
      snippetId: Number(id),
      texte: newComment,
    });
    setNewComment("");
    loadComments();
  };

  const toggleLike = async () => {
    await api.post("/likes", { snippetId: Number(id) });
    loadLikes();
  };

  if (!snippet) return <p>Chargement…</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-bold">{snippet.titre}</h1>
      <p className="text-gray-400">{snippet.langage}</p>

      <pre className="bg-gray-900 p-4 rounded mt-4">{snippet.code}</pre>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={toggleLike} className="px-3 py-1 bg-blue-600 rounded">
          ❤️ Like
        </button>
        <span>{likeCount} likes</span>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Commentaires</h2>

      <div className="mt-2">
        {comments.map((c: any) => (
          <div key={c.identifiant_commenter} className="bg-gray-800 p-3 my-1 rounded">
            <p>{c.texte}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <textarea
          className="w-full bg-gray-800 p-2 rounded"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={sendComment}
          className="mt-2 px-4 py-2 bg-green-600 rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
