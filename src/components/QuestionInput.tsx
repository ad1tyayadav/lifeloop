"use client"

interface QuestionInputProps {
    question: string
    onQuestionChange: (question: string) => void
}

export default function QuestionInput({ question, onQuestionChange }: QuestionInputProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-soft-black mb-3">Your Question</label>

            <textarea
                value={question}
                onChange={(e) => onQuestionChange(e.target.value)}
                placeholder="e.g., What are the top 5 suspicious transactions? Which accounts need investigation?"
                className="w-full px-4 py-3 rounded-xl border-2 border-mint-accent/40 bg-white text-soft-black placeholder-deep-grey/40 focus:outline-none focus:ring-2 focus:ring-mint-dark focus:border-mint-dark focus:shadow-lg focus:shadow-mint-dark/20 resize-none transition-smooth"
                rows={4}
            />

            <p className="text-xs text-deep-grey/60 mt-2">Be specific with your question for better results</p>
        </div>
    )
}
