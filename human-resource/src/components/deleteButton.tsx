import React from "react";
import { useDelete } from "@/hooks/useDelete";
import LoadingOffPage from "@/components/loading/LoadingOffPage";

interface DeleteButtonProps {
  url: string;
  onDeleted?: () => void;
  confirmMessage?: string;
  reloadOnSuccess?: boolean; // <-- opsional override reload
  children?: React.ReactNode;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  url,
  onDeleted,
  confirmMessage,
  reloadOnSuccess,
  children = "Hapus",
}) => {
  const { handleDelete, isDeleting } = useDelete({
    confirmMessage,
    onSuccess: onDeleted,
    reloadOnSuccess,
  });

  return (
    <>
      {isDeleting && <LoadingOffPage />}
      <button
        onClick={(e) => handleDelete(url, e)}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isDeleting ? "Menghapus..." : children}
      </button>
    </>
  );
};

export default DeleteButton;
