import './button.scss'

export default function Button({
  children,
  className = '',
  type = 'primary',
  onClick,
  loading = false,
}: {
  children?: React.ReactNode
  className?: string
  type?: 'primary' | 'default'
  onClick?: () => void
  loading?: boolean
}) {
  return (
    <>
      {loading ? (
        <div className="loader !w-[26px] !h-[26px]" />
      ) : (
        <a
          className={`button ${className}`}
          onClick={() => onClick && onClick()}
        >
          <div className={`${type === 'primary' ? 'a' : 'b'}`}>{children}</div>
        </a>
      )}
    </>
  )
}
