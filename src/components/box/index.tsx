import "./box.scss";

export default function Box({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={`box ${className}`}>
      <div className="">{children}</div>
    </a>
  );
}
