import "./button.scss";

export default function Button({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={`button ${className}`}>
      <div className="">{children}</div>
    </a>
  );
}
