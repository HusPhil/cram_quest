
interface SubjectScreenFooterProps {
    subjectId: Number
}

export default function SubjectScreenFooter({
    subjectId
}: SubjectScreenFooterProps) {
  return (
    <div className="flex flex-col h-full w-full mt-5">
        <button className="mb-4 px-4 py-2 bg-accent text-white rounded">
          Start Battle for subject: {subjectId.toString()}
        </button>
    </div>
  )
}
