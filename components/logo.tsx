interface typeProps {
  className?: string
  title?: string
}

export const Logo = ({ className, title = '' }: typeProps) => (
  <div className={className}>
    <span className="hidden lg:block">
      {title != '' ? title : 'Soccer Champ : ทายผลบอล'}
    </span>
  </div>
)
