interface TagLabelProps {
  children?: React.ReactNode;
  info?: string;
  className?: string
}

export default function TagLabel({ info, children, className }: TagLabelProps) {
  return (
    <span className={`line-clamp-1 text-xs bg-accent/10 
                    border border-accent/20 ${className}`}>
      {info || children}
    </span>
  )
}
