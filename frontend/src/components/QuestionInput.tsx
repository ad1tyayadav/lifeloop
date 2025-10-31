"use client"

interface QuestionInputProps {
    question: string
    onQuestionChange: (question: string) => void
}

export default function QuestionInput({ question, onQuestionChange }: QuestionInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Your Question</label>

            <textarea
                value={question}
                onChange={(e) => onQuestionChange(e.target.value)}
                placeholder="e.g., What are the top 5 suspicious transactions? Which accounts need investigation?"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39D98A] focus:border-[#39D98A] resize-none transition-colors"
                rows={4}
            />

            <p className="text-xs text-gray-500 mt-2">Be specific with your question for better results</p>
        </div>
    )
}