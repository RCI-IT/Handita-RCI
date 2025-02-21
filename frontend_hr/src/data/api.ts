
// Fungsi API untuk mengambil data karyawan
export const fetchKaryawan = async (id?: string) => {
    const url = id ? `/api/karyawan/${id}` : '/api/karyawan';  // API endpoint berdasarkan ID (opsional)
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Gagal mengambil data karyawan${id ? ` dengan ID: ${id}` : ''}`);
    }
  
    return await response.json();
  };
  