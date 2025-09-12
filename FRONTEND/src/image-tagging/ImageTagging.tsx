import FileUploader from "./components/file-uploader";
import { useState } from "react";
import { getTags } from "./service/tag.api";
import { Button } from "@/components/ui/button";

function ImageTagging() {

  const [img, setImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<{ label: string; confidence: number }[]>([]);  
  const handleUpload =  async () => {
    setIsLoading(true);
    try {
      const tags = await getTags(img!);
      setTags(tags);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const handleFileChange = (file: File) => {
    setImg(file);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center bg-gradient-to-b">
        <FileUploader handleFileChange={handleFileChange}/>
        <div className="w-1/2 aspect-square flex items-center justify-center rounded-lg overflow-hidden bg-gray-200">
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className="object-contain w-full h-full"
            />
          ) : (
            <p className="text-white">No hay imagen cargada</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
          >
            {tag.label} ({(tag.confidence * 100).toFixed(0)}%)
          </span>
        ))}
      </div>
      <div>
          <Button onClick={handleUpload} disabled={img === null || isLoading}>Analizar</Button>
      </div>
    </div>
  )
}

export default ImageTagging;