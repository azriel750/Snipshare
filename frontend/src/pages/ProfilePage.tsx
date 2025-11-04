import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../service/api";
import StatCard from "../composant/molecules/statcard";
import "../Style/Profile.css"

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

        const likedRes = await api.get(`/snippets/likedBy/${user.identifiant_utilisateur}`);

        setStats({
          snippets: snippets.length,
          likesReceived,
          likedSnippets: likedRes.data.length,
        });
      } catch (err) {
        console.error("Erreur lors du chargement des stats:", err);
      }
    }

    loadStats();
  }, [user]);

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Non connecté.</p>;

  return (
    <div className="profile-page max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>

      <section className="user-info p-6 bg-gray-800 rounded-lg mb-8">
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>ID :</strong> {user.identifiant_utilisateur}</p>
      </section>

      <section className="stats-section">
        <h2 className="text-2xl font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Snippets créés" value={stats.snippets} />
          <StatCard label="Likes reçus" value={stats.likesReceived} />
          <StatCard label="Snippets likés" value={stats.likedSnippets} />
        </div>
      </section>
    </div>
  );
}
