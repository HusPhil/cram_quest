import React, { use, useEffect, useState } from "react";

interface EditPageProps {
  subjectId: number;
  subjectCodeName: string;
  subjectDescription: string;
}

export default function EditPage({
  subjectId,
  subjectCodeName,
  subjectDescription,
}: EditPageProps) {
  const [newSubjectCodeName, setNewSubjectName] = useState(subjectCodeName);
  const [newSubjectDescription, setNewDescription] = useState(subjectDescription);

  useEffect(() => {
    setNewSubjectName(subjectCodeName);
    setNewDescription(subjectDescription);
  }, [subjectId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle update logic (e.g., API call)
    console.log("Updated:", { subjectName: newSubjectCodeName, description: newSubjectDescription });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-4">
      <div className="bg-secondary/40 border border-accent/70 rounded-2xl w-full max-w-md p-6 space-y-4">

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="codeName" className="text-sm text-text/70 mb-1">
              Code Name
            </label>
            <input
              id="codeName"
              type="text"
              className="bg-background border border-text/30 rounded-lg px-3 py-2 text-sm text-text focus:outline-accent"
              value={newSubjectCodeName}
              onChange={(e) => setNewSubjectName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm text-text/70 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="bg-background border border-text/30 rounded-lg px-3 py-2 text-sm text-text focus:outline-accent resize-none"
              value={newSubjectDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-accent text-white hover:brightness-110 transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
