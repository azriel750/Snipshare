import "../Style/Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} SnipShare — Tous droits réservés.</p>
      <p>
        Projet réalisé dans le cadre du module Simplon.  
      </p>
    </footer>
  );
}
