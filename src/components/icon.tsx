export default function Icon({
  name = "",
  className = "",
}: {
  prefix?: string;
  name: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      aria-hidden={true}
      style={{display:'inline-block'}}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}
