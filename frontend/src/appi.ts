export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchSnippets(params: {
  q?: string;
  langage?: string;
  tag?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.q) query.append("q", params.q);
  if (params.langage) query.append("langage", params.langage);
  if (params.tag) query.append("tag", params.tag);

  const res = await fetch(`${API_URL}/api/snippets?${query.toString()}`);
  if (!res.ok) throw new Error("Erreur API fetchSnippets");
  return res.json();
}
export async function fetchUserSnippets() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/api/snippets/user/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Erreur API fetchUserSnippets");
  return res.json();
}
export async function fetchUserStats() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/users/me/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erreur API fetchUserStats");

  return res.json();
}
