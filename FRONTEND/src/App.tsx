import testImage from './assets/test.jpg'

function App() {

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Analizador de imágenes
        </h1>
      </div>

      <div>
        <p className="text-white">
          imagen: buscador
        </p>
      </div>

      <div className="w-1/2 aspect-square bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden">
        <img src={testImage} alt="test" />
        <p className="text-white">carga de imagen</p>
      </div>

      <div>
        <p className="text-white">aqui van los tags
        </p>
      </div>
    </div>
  )
}

export default App
