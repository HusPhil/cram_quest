
interface SubjectScreenFooterProps {
    subjectId: Number
}

export default function SubjectScreenFooter({
    subjectId
}: SubjectScreenFooterProps) {
  return (
    <div className="flex flex-col bg-primary/30 justify-center items-center">
        <button className="px-4 py-2 bg-accent text-white rounded">
          Start Battle for subject: {subjectId.toString()}
        </button>
    </div>
  )
}
