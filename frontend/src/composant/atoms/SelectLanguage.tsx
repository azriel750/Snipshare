interface Props {
  value: string;
  onChange: (lang: string) => void;
}

const langages = ["javascript", "typescript", "python", "php", "c#", "c++"];

export default function SelectLangage({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Tous les langages</option>
      {langages.map((l) => (
        <option key={l} value={l}>{l}</option>
      ))}
    </select>
  );
}
