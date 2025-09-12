const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getTags(file: File): Promise<{ label: string; confidence: number }[]> {
  const formData = new FormData();
  formData.append("image", file); 

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }

  return response.json();
}
