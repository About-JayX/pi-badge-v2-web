import "./button.scss";

export default function Button({
  children,
  className = "",
  type = "primary",
  onClick
}: {
  children?: React.ReactNode;
  className?: string;
  type?: "primary" | "default";
  onClick?:()=>void
}) {
  return (
    <a className={`button ${className}`} onClick={()=>onClick && onClick()}>
      <div className={`${type === "primary" ? "a" : "b"}`}>{children}</div>
    </a>
  );
}
