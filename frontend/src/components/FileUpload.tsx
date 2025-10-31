"use client"

import type React from "react"

import { useRef } from "react"
import { Upload } from "lucide-react"

interface FileUploadBoxProps {
    file: File | null
    onFileChange: (file: File | null) => void
}

export default function FileUploadBox({ file, onFileChange }: FileUploadBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.currentTarget.classList.add("border-[#39D98A]", "bg-[#39D98A]/10")
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove("border-[#39D98A]", "bg-[#39D98A]/10")
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.currentTarget.classList.remove("border-[#39D98A]", "bg-[#39D98A]/10")

        const files = e.dataTransfer.files
        if (files.length > 0) {
            onFileChange(files[0])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileChange(e.target.files[0])
        }
    }

    return (
        <div>
            <label className="block text-sm font-semibold text-[#1E1E1E] mb-3">Upload Transaction CSV</label>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-[#39D98A]/30 rounded-xl p-8 text-center cursor-pointer transition-smooth hover:border-[#39D98A] hover:bg-[#39D98A]/5 active:scale-95"
            >
                <input ref={inputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />

                {file ? (
                    <div className="flex items-center justify-center gap-4 animate-scale-in">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#39D98A]/10 to-[#007AFF]/5 flex items-center justify-center shadow-md shadow-[#39D98A]/20">
                            <Upload className="w-6 h-6 text-[#39D98A]" />
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-[#1E1E1E]">{file.name}</p>
                            <p className="text-xs text-[#5A5A5A]">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="w-12 h-12 rounded-lg bg-[#39D98A]/10 flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-6 h-6 text-[#39D98A]" />
                        </div>
                        <p className="font-semibold text-[#1E1E1E]">Drag & drop your CSV here</p>
                        <p className="text-sm text-[#5A5A5A] mt-1">Supports .CSV up to 5MB</p>
                    </div>
                )}
            </div>
        </div>
    )
}