import { Button } from "@/components/ui/button"
import ImageTagging from './image-tagging/ImageTagging'


function App() {

  return (
    <div className="min-h-screen w-full bg-neutral-600 flex flex-col items-center justify-center gap-6">
      <div className="mt-20">
        <h1 className="text-3xl font-bold text-white">
          Analizador de imágenes
        </h1>
      </div>
      <div>
        <ImageTagging></ImageTagging>
      </div>
    </div>
  )
}

export default App
