
export type FormValues = {
    tipe: "Inter" | "Office";
    nomorPO: string;
    nomorCO: string;
    nomorPL: string;
    nomorKontrak: string;
    tanggal: string;
    namaSupplier: string;
    alamat: string;
    noTelephone: string;
    referensi: string;
    pajak: string;
    detailPembelian: {
      kodeBudget: string;
      deskripsi: string;
      gambar: string;
      preview: string;  
      harga: string;
      hargaNumber: number;
      kuantitas: number;
      satuan: string;
      total: string;
      budget: "Dibawah" | "Mendekati" | "Diatas";
      canDelete: boolean;
    }[];
  };


export type Calc = FormValues & {
  subtotal: number;
  pajakNum: number;
  total: number;
  terbilang: string;
}