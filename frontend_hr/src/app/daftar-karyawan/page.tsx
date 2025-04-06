"use client";

import Breadcrumb from "@/components/breadcrumb";
import CardHead from "@/components/card-head";
import Image from "next/image";
import { FaUserPlus } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { BiSolidUserMinus } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa6";
import { Employee } from "@/types/daftarKaryawan";
import { deleteData, useKaryawanData } from "@/api/apiKaryawan";
import { ColumnDef } from "@tanstack/react-table";
// import axios from "axios";
import Table from "@/components/tabel";
import Link from "next/link";
import { TbEye } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import LoadingPage from "@/components/loading";

export default function DaftarKaryawan() {
  const { data, error, isLoading, isNotFound } = useKaryawanData();

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error when Load Data: {error.message}</div>;
  if (isNotFound) return <div>No data was found.</div>;
  if ("message" in data) {
    // If data has a message, it is an ErrorResponse
    return <div>Error: {data.message}</div>;
  }

  const handleDeleteClick = async (
    idKaryawan: string,
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    e.preventDefault(); // Mencegah navigasi otomatis jika ini dipanggil dalam <Link> atau elemen lainnya

    // Menampilkan konfirmasi penghapusan
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus karyawan ini?"
    );
    if (confirmed) {
      try {
        // Menghapus data karyawan
        await deleteData(idKaryawan);

        // Setelah penghapusan, arahkan pengguna ke halaman daftar karyawan atau tempat lainnya
        alert("Karyawan berhasil dihapus");
        window.location.href = "/daftar-karyawan"; // Mengarahkan kembali ke daftar karyawan
      } catch (error) {
        // Menangani error jika penghapusan gagal
        alert("Terjadi kesalahan saat menghapus karyawan");
        console.error(error);
      }
    }
  };
  const columns: ColumnDef<Employee>[] = [
    {
      id: "image",
      header: "Foto",
      accessorKey: "image",
      cell: (ctx) => {
        return (
          <div className="w-32 h-32 relative overflow-hidden mx-auto">

            {/* Only render the Image component if ctx.getValue() is a valid string */}
            {typeof ctx.getValue() === "string" && ctx.getValue() !== "" ? (
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_API_BACKEND
                }/images/${ctx.getValue()}`}
                alt={typeof ctx.row.original.image === 'string' ? ctx.row.original.image : 'Profile Image'}
                width={500}
                height={500}
                className="w-full h-full rounded-lg object-cover object-center"
              />
            ) : (
              <p>No valid image available</p> // Fallback text in case there's no valid image
            )}
          </div>
        );
      },
    },
    {
      header: "fullName",
      accessorKey: "fullName",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "Id Karyawan",
      accessorKey: "employeeNumber",
      cell: (ctx) => ctx.getValue(),
    },
    {
      header: "Posisi",
      accessorKey: "position",
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: "Aksi",
      header: "Aksi",
      accessorKey: "id",
      cell: (ctx) => {
        const idKaryawan = ctx.row.original.id; // Mengakses data asli dari baris
        if (!idKaryawan) return null; // Menghindari jika idKaryawan tidak ada
        return (
          <div className="flex justify-center place-items-center space-x-5">
            <Link href={`/${idKaryawan}`}>
              <TbEye className={`text-2xl text-blue-600`} />
            </Link>
            <button onClick={(e) => handleDeleteClick(idKaryawan, e)}>
              <MdOutlineDeleteForever className={`text-2xl text-red-900`} />
            </button>
          </div>
        );
      },
    },
    // {
    //     id: 'email',
    //     header: 'Id Karyawan',
    //     cell: (ctx: { row: { original: { email: any } } }) => {
    //         const { email } = ctx.row.original;

    //         return <span className='font-bold'>{email}</span>
    //     },
    // },
  ];

  return (
    <div className="w-full pt-8 pr-6">
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">
          Manajemen Karyawan
        </p>
        <Breadcrumb />
        <ul>
          {data?.map((karyawan) => (
            <li key={karyawan.id}>
              <h3>{karyawan.fullName}</h3>
              <p>{karyawan.position}</p>
              <p>{karyawan.email}</p>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between w-full py-5 space-x-6">
        <CardHead
          Icon={HiUsers}
          title={""}
          jumlah={100}
          perubahan={"Total Karyawan"}
          itemClass={"items-center"}
          logoClass={"bg-blue-200 text-blue-900 text-4xl p-2"}
        />
        <CardHead
          Icon={FaUserPlus}
          title={""}
          jumlah={100}
          perubahan={"Karyawan Baru"}
          itemClass={"items-center"}
          logoClass={"bg-green-200 text-green-900 text-4xl p-2"}
        />
        <CardHead
          Icon={BiSolidUserMinus}
          title={""}
          jumlah={30}
          perubahan={"Karyawan Berhenti"}
          itemClass={"items-center"}
          logoClass={"bg-red-200 text-red-900 text-4xl p-2"}
        />
        <CardHead
          Icon={FaUserClock}
          title={""}
          jumlah={30}
          perubahan={"Karyawan Cuti"}
          itemClass={"items-center"}
          logoClass={"bg-yellow-200 text-yellow-900 text-4xl p-2"}
        />
      </div>

      <Table
        objectData={data ?? []}
        columns={columns}
        judul={`Daftar Karyawan`}
        tambahLink={'/tambah-karyawan'}
      />
    </div>
  );
}
