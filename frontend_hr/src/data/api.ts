
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
import { TypeKaryawan } from '@/types/daftarKaryawan';

// URL API Karyawan
const API_URL = 'http://localhost:3000/api/karyawan';

// Fungsi fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom hook untuk mengambil data karyawan
export const useKaryawanData = () => {
  const { data, error } = useSWR<TypeKaryawan[]>(API_URL, fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

