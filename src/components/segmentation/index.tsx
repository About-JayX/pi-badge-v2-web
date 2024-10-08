import "./segmentation.scss";
export default function Segmentation({
  data = [],
  value = "",
  onChange,
}: {
  data?: { name: string; value: string; disabled?: boolean }[];
  value?: string;
  onChange?: (e: string) => void;
}) {
  return (
    <div className="btn-group">
      {data.map((item, index) => (
        <a
          onClick={() => !item.disabled && onChange && onChange(item.value)}
          key={index}
          className={`btn btn-primary ${item.value === value ? "active" : ""} ${
            item.disabled ? "cursor-not-allowed" : ""
          }`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}
