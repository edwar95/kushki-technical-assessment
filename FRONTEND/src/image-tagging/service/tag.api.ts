const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTags(file: File): Promise<{ label: string; confidence: number }[]> {
  const formData = new FormData();
  formData.append("image", file); 

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.log("Error body:", errorBody);
    throw new Error(errorBody.message || "Error al analizar la imagen");
  }

  const responseData = await response.json();
  return responseData.tags;
}
