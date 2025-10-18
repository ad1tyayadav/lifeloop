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
        e.currentTarget.classList.add("border-mint-dark", "bg-mint-light/20")
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove("border-mint-dark", "bg-mint-light/20")
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.currentTarget.classList.remove("border-mint-dark", "bg-mint-light/20")

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
            <label className="block text-sm font-semibold text-soft-black mb-3">Upload Transaction CSV</label>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-mint-accent/60 rounded-xl p-8 text-center cursor-pointer transition-smooth hover:border-mint-dark hover:bg-mint-light/10 active:scale-95"
            >
                <input ref={inputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />

                {file ? (
                    <div className="flex items-center justify-center gap-4 animate-scale-in">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mint-light to-mint-medium flex items-center justify-center shadow-md shadow-mint-dark/20">
                            <Upload className="w-6 h-6 text-mint-dark" />
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-soft-black">{file.name}</p>
                            <p className="text-xs text-deep-grey/60">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="w-12 h-12 rounded-lg bg-mint-light/40 flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-6 h-6 text-mint-dark" />
                        </div>
                        <p className="font-semibold text-soft-black">Drag & drop your CSV here</p>
                        <p className="text-sm text-deep-grey/60 mt-1">or click to browse</p>
                    </div>
                )}
            </div>
        </div>
    )
}
