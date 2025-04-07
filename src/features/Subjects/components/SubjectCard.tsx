import React from 'react'

interface SubjectCardProps {
    code_name: string;
    description: string;
    difficulty: string;
    id: number;
}

export default function SubjectCard({
    code_name,
    description,
    difficulty,
    id,
}: SubjectCardProps) {
  return (
    <div 
        className="group bg-card rounded-xl p-6 transition-all duration-200
                border border-border hover:border-primary/20
                shadow-sm hover:shadow-lg hover:shadow-primary/5
                active:scale-[0.98] cursor-pointer
                relative overflow-hidden"
    >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Content with improved typography and spacing */}
        <div className="relative z-10">
        <h2 className="text-2xl font-bold text-primary mb-3">{description}</h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">{code_name}</p>
        
        {/* Difficulty indicator with dynamic styling */}
        <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Difficulty:</span>
            <span className={`font-medium ${
            difficulty === 'Easy' ? 'text-green-500' :
            difficulty === 'Medium' ? 'text-yellow-500' :
            'text-red-500'
            }`}>
            {difficulty}
            </span>
        </div>
        </div>
    </div>
  )
}

