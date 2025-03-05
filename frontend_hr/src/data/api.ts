
// Fungsi API untuk mengambil data karyawan
export const fetchKaryawan = async (id?: string) => {
    const url = id ? `/api/karyawan/${id}` : '/api/karyawan';  // API endpoint berdasarkan ID (opsional)
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Gagal mengambil data karyawan${id ? ` dengan ID: ${id}` : ''}`);
    }
  
    return await response.json();
  };
  

// utils/fetchKaryawan.ts
import useSWR from 'swr';
import { Employee } from '@/types/daftarKaryawan';

// URL API Karyawan
const API_URL = 'http://localhost:4000/api/employees';

// Interface untuk struktur error response
interface ErrorResponse {
  message: string;
}

// Fungsi fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom hook untuk mengambil data karyawan
export const useKaryawanData = () => {
  const { data, error } = useSWR<Employee[] | ErrorResponse>(API_URL, fetcher);
  const isNotFound = data && (data as ErrorResponse).message?.includes('not found'); 

  return {
    data: data || [],
    error,
    isLoading: !data && !error,
    isNotFound,
  };
};

export const useKaryawanDataDetail = (id: string) => {
  const { data, error } = useSWR<Employee | ErrorResponse>(`${API_URL}/${id}`, fetcher);

  const isNotFound = data && (data as ErrorResponse).message?.includes('not found'); // Memeriksa pesan error

  return {
    data: data || null,
    error,
    isLoading: !data && !error,
    isNotFound,
  };
}