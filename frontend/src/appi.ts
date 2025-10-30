export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchSnippets() {
  const response = await fetch("http://localhost:3000/api/snippets");

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des snippets");
  }
  return response.json();
}
