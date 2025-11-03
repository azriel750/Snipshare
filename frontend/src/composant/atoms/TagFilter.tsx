interface Props {
  onSelect: (tag: string) => void;
  tags: string[];
}

export default function TagFilter({ tags, onSelect }: Props) {
  return (
    <div>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            background: "#eee",
            borderRadius: "5px",
            cursor: "pointer"
          }}
          onClick={() => onSelect(t)}
        >
          #{t}
        </span>
      ))}
    </div>
  );
}
