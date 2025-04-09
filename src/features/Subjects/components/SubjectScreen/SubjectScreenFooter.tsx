
interface SubjectScreenFooterProps {
    subjectId: Number
}

export default function SubjectScreenFooter({
    subjectId
}: SubjectScreenFooterProps) {
  return (
    <div className="flex flex-col pb-2 space-y-2">
        <hr className="flex-1 mt-2 border-text/50" />
          
        <button className="px-4 py-2 mb-2 bg-accent text-white rounded">
          Start Battle for subject: {subjectId.toString()}
        </button>
    </div>
  )
}
