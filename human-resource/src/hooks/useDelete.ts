// src/hooks/useDelete.ts
import { useState, useEffect } from "react";
import { deleteData } from "@/services/deleteData";

type UseDeleteOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  confirmMessage?: string;
  confirm?: boolean;
};

export function useDelete(options?: UseDeleteOptions) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDeleting ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDeleting]);

  const handleDelete = async (
    url: string,
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();

    if (options?.confirm !== false) {
      const confirmed = window.confirm(
        options?.confirmMessage || "Yakin ingin menghapus data ini?"
      );
      if (!confirmed) return;
    }

    setIsDeleting(true);
    try {
      await deleteData(url);
      options?.onSuccess?.();
      window.location.reload(); // ⬅ Tambahkan ini
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus.");
      options?.onError?.(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}