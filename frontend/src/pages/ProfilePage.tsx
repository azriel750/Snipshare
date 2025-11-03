import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../service/api";
import StatCard from "../composant/molecules/statcard";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    snippets: 0,
    likesReceived: 0,
    likedSnippets: 0,
  });

  useEffect(() => {
    if (!user) return;

    async function loadStats() {
      try {
        const res = await api.get(`/snippets/user/${user.identifiant_utilisateur}`);

        const snippets = res.data;
        const likesReceived = snippets.reduce(
          (acc: number, s: any) => acc + (s._count?.aimer || 0),
          0
        );

        const likedRes = await api.get(`/snippets?likedBy=${user.identifiant_utilisateur}`);

        setStats({
          snippets: snippets.length,
          likesReceived,
          likedSnippets: likedRes.data.length,
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    }

    loadStats();
  }, [user]);

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Non connecté.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>

      <div className="p-4 bg-gray-800 rounded-lg mb-6">
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>ID :</strong> {user.identifiant_utilisateur}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Statistiques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Snippets créés" value={stats.snippets} />
        <StatCard label="Likes reçus" value={stats.likesReceived} />
        <StatCard label="Snippets likés" value={stats.likedSnippets} />
      </div>
    </div>
  );
}
