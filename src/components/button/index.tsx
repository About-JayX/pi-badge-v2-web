import './button.scss'

export default function Button({
  children,
  className = '',
  type = 'primary',
  onClick,
  loading,
}: {
  children?: React.ReactNode
  className?: string
  type?: 'primary' | 'default'
  onClick?: () => void
  loading?: boolean
}) {
  return (
    <a className={`button ${className}`} onClick={() => onClick && onClick()}>
      {loading ? (
        <div className={`${type === 'primary' ? 'a' : 'b'}`}>{children}</div>
      ) : (
        children
      )}
    </a>
  )
}
