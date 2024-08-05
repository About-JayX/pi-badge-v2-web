import "./button.scss";

export default function Button({
  children,
  className = "",
  type = "primary",
}: {
  children?: React.ReactNode;
  className?: string;
  type?: "primary" | "default";
}) {
  return (
    <a className={`button ${className}`}>
      <div className={`${type === "primary" ? "a" : "b"}`}>{children}</div>
    </a>
  );
}
