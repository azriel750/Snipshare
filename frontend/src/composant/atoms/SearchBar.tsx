import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Rechercher un snippet..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}
