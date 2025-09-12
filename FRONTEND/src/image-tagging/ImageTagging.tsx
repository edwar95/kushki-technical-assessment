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
      console.log(tags);
      setTags(tags);
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }

  const handleFileChange = (file: File) => {
    setTags([]);
    setImg(file);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center bg-gradient-to-b">
        <FileUploader handleFileChange={handleFileChange} isLoading={isLoading}/>
        <div className="w-1/2 aspect-square flex items-center justify-center rounded-lg overflow-hidden bg-gray-200">
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className="object-contain w-full h-full"
            />
          ) : (
            <p >No hay imagen cargada</p>
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
          <Button onClick={handleUpload} disabled={isLoading || !img}>
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? "Cargando..." : "Enviar"}
          </Button>
      </div>
    </div>
  )
}

export default ImageTagging;