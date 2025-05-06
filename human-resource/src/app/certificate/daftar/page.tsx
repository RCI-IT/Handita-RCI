"use client";

import Breadcrumb from "@/components/breadcrumb";
import Table from "@/components/tabel";
import IsNotFound from "@/handler/isNotFound";
import { LoadingPage } from "@/handler/loading";
import { useCertificate } from "@/services/apiCertificate";
import { Certificate } from "@/types/certificateType";
import { ColumnDef } from "@tanstack/react-table";
import { TbEye } from "react-icons/tb";

export default function CertificateList() {
  const { data, error, isLoading, isNotFound } = useCertificate();

  if (isLoading) return <LoadingPage />;
  if (error) return <IsNotFound />;
  const isError = isNotFound || "message" in data;
  const columns: ColumnDef<Certificate>[] = [
    {
      header: "Nama Pemilik",
      accessorKey: "employee.fullName",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "Kualifikasi",
      accessorKey: "qualification",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "No. Sertifikat",
      accessorKey: "certificateNo",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "No. Registrasi",
      accessorKey: "registrationNo",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "Terbit",
      accessorKey: "issueDate",
      cell: (ctx) => {
        const date = ctx.getValue();
        if (typeof date === "string") return date.slice(0, 10);
      },
    },
    {
      header: "Expired",
      accessorKey: "expireDate",
      cell: (ctx) => {
        const date = ctx.getValue();
        if (typeof date === "string") return date.slice(0, 10);
      },
    },
    {
      header: "Terpakai / Belum",
      accessorKey: "status",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "Perusahaan",
      accessorKey: "company",
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: "Aksi",
      header: "Aksi",
      accessorKey: "id",
      cell: (ctx) => {
        const link = ctx.row.original.documentLink; // Mengakses data asli dari baris
        if (!ctx.getValue()) return null; // Menghindari jika idKaryawan tidak ada
        return (
          <div className="flex justify-center place-items-center space-x-5">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <TbEye className={`text-2xl text-blue-600`} />
            </a>
            {/* <button onClick={(e) => handleDelete(idKaryawan, e)}>
                <MdOutlineDeleteForever className={`text-2xl text-red-900`} />
              </button> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-5">
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">
          Sertifikat Keahlian Kerja (SKK){" "}
        </p>
        <Breadcrumb />
      </nav>

      <Table
        objectData={isError ? [] : data}
        columns={columns}
        judul={`Daftar Certificate`}
        tambahLink={"/certificate/tambah"}
      />
    </div>
  );
}
