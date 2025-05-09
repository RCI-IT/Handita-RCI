// src/services/deleteData.ts
const apiURL = process.env.NEXT_PUBLIC_API_BACKEND;
export const deleteData = async (endpoint: string) => {
  const response = await fetch(`${apiURL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus data");
  }

  return response.json();
};
