import { useState } from "react"

export default function ImageDropzone({ images, setImages, selectedIndex, setSelectedIndex }) {
  const [error, setError] = useState("")

  const handleFiles = (files) => {
    const newFiles = Array.from(files)

    if (newFiles.length + images.length > 4) {
      setError("You can add just 4 pictures")
      return
    }

    setError("")
    setImages((prev) => [...prev, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    handleFiles(e.target.files)
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))

    if (selectedIndex === index) {
      setSelectedIndex(null)
    }
  }

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="border border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer" onClick={() => document.getElementById("fileInput").click()}>
      {!error && images.length < 4 && <p className="text-gray-600 mb-2">{images.length === 0 ? "Drag and drop images here" : `Drag and drop ${4 - images.length} images more`}</p>}

      <input id="fileInput" type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {images.map((file, idx) => (
            <div
              key={idx}
              className={`relative h-24 w-30 cursor-pointer rounded overflow-hidden border-2 ${selectedIndex === idx ? "border-green-500 shadow-[0_0_10px_3px_rgba(34,197,94,0.7)]" : "border-transparent"}`}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(idx)
              }}
            >
              <img src={URL.createObjectURL(file)} alt="preview" className="h-24 w-24 object-cover rounded" />
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(idx)
                }}
                className="absolute top-0.5 right-3 bg-opacity-50 text-red-700 font-extrabold rounded-full px-1 h-2 w-2 color"
              >
                ✕
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
