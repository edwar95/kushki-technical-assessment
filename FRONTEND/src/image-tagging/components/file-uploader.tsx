import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FileUploaderProps {
  handleFileChange: (file: File) => void;
  isLoading?: boolean;
}

function FileUploader(
  { handleFileChange, isLoading }: FileUploaderProps
) {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };


  return (
  <div className="flex flex-col items-center justify-center gap-4 text-white mb-6">
    <Label htmlFor="picture">Carga una imagen:</Label>
    <Input id="picture" type="file" onChange={onChange} disabled={isLoading}/>
  </div>)
}

export default FileUploader;