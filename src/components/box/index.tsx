import './box.scss'

export default function Box({
  children,
  className = '',
  click = () => {},
}: {
  children?: React.ReactNode
  className?: string
  click?: () => void
}) {
  return (
    <a className={`box ${className}`}>
      <div className="" onClick={click}>
        {children}
      </div>
    </a>
  )
}
