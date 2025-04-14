// src/hooks/useDeleteEmployee.ts
import { useEffect, useState } from "react";
import { deleteData } from "@/services/apiKaryawan";

export function useDeleteEmployee() {
  const [isDeleting, setIsDeleting] = useState(false);

  // Disable scroll saat loading
  useEffect(() => {
    document.body.style.overflow = isDeleting ? "hidden" : "";
  }, [isDeleting]);

  const handleDelete = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const confirmed = window.confirm("Yakin ingin menghapus karyawan ini?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteData(id);
      // window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus karyawan:", error);
      alert("Terjadi kesalahan saat menghapus.");
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}
