interface TagLabelProps {
  info: string;
}

export default function TagLabel({ info }: TagLabelProps) {
  return (
    <div className="inline-block items-center gap-2">
      <div className="relative lg:mb-2">
        <span className="line-clamp-1 relative px-3 py-0.5 text-xs bg-accent/10 
                       text-text rounded-full border border-accent/20">
          {info}
        </span>
      </div>
    </div>
  )
}
