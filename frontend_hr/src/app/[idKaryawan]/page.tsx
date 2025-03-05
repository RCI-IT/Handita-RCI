"use client";
import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { TypeKaryawan } from "@/types/daftarKaryawan";
import useSWR from "swr";
import { useKaryawanDataDetail } from "@/data/api";

const Fetcher = async (url: string) => {
  try {
    const response = await fetch(url);

    // Cek status respons, pastikan 200 (OK)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Cek apakah respons bisa di-parse sebagai JSON
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    // Pengecekan tipe error
    if (error instanceof Error) {
      // Jika error adalah instance dari Error, kita bisa mengakses properti `message`
      throw new Error("Error fetching data: " + error.message);
    } else {
      // Jika error bukan instance dari Error, kita menangani kasus lainnya
      throw new Error("An unknown error occurred");
    }
  }
};

export default function DetailKaryawan() {
  // const [loading, setLoading] = useState<boolean>(true); // Menandakan status loading

  const params = useParams(); // Retrieve the dynamic parameters

  const { idKaryawan } = params; // Access the 'id' parameter from the URL

  const validId = idKaryawan && !Array.isArray(idKaryawan) ? idKaryawan : "";
  const { data, error, isLoading, isNotFound } = useKaryawanDataDetail(validId);

  // If idKaryawan is invalid (null, undefined, or an array), render an error
  if (!idKaryawan || Array.isArray(idKaryawan)) {
    return <div>Error: Invalid ID provided in the URL query string.</div>;
  }

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  // Periksa apakah respons memiliki pesan error
  if (isNotFound) return <div>No employee found with ID {idKaryawan}</div>;

  // Conditional check to ensure `data` is available before rendering.

  if ((!data && !isLoading) || data === null) {
    console.log("Data is missing:", data); // Check if data is undefined
    return <div>No employee data found</div>;
  }

  // Check if `data` is an ErrorResponse by checking if it has a `message` property
  if ("message" in data) {
    // If data has a message, it is an ErrorResponse
    return <div>Error: {data.message}</div>;
  }

  return (
    <div className="w-full pt-8 pb-6 pr-6 space-y-4">
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">Detail Karyawan</p>
        <Breadcrumb />
      </nav>

      <div className="w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
        <h3 className="text-xl font-semibold py-4 px-4 space-y-4">
          Profil Karyawan
        </h3>

        {/* Garis Pembatas */}
        <div className="w-auto border-t-2 border-gray-300"></div>

        <div className="w-full flex justify-evenly py-4 px-4 space-y-4">
          <div className="flex-1 flex justify-start">
            <div className="w-40 h-40 relative">
              <Image
                src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
                alt="KTP"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-lg"
              />
            </div>
            <div className="w-full px-4">
              <div className="pb-4">
                <p className="font-medium text-lg">{data.fullName}</p>
                <p className="font-thin text-gray-600 text-sm">IT Staff</p>
              </div>
              <div className="flex w-full space-x-6">
                <div>
                  <p>ID Karyawan</p>
                  <p>Jenis Kelamin</p>
                  <p>Alamat</p>
                </div>
                <div className="font-light text-gray-500">
                  <p>{data.employeeNumber}</p>
                  <p>{data.gender}</p>
                  <p>{data.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Garis Putus-Putus Pembatas */}
          <div className="border-l-2 border-dashed border-gray-500 h-auto"></div>

          <div className="flex-1 px-4 h-auto flex items-center space-x-6">
            <div>
              <p>Tempat Lahir</p>
              <p>Tanggal Lahir</p>
              <p>Agama</p>
              <p>Email</p>
              <p>No. Telp</p>
            </div>
            <div className="font-light text-gray-500">
              <p>{data.birth}</p>
              <p>{data.birthDate}</p>
              <p>{data.religion}</p>
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
        <h3 className="text-xl font-semibold py-4 px-4 space-y-4">
          Pendidikan Terakhir
        </h3>

        {/* Garis Pembatas */}
        <div className="w-auto border-t-2 border-gray-300"></div>

        <div className="w-full overflow-y-auto flex space-x-3 py-4 px-4">
          <div className="border-2 border-blue-700 w-5 h-5 rounded-full"></div>
          <div>
            <p>S1 = {data.education}</p>
            <p className="font-light text-gray-500 text-sm">tanggal lulus = {data.education}</p>
            <p className="font-light text-gray-500 text-sm">jurusan = {data.school}</p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
        <h3 className="text-xl font-semibold py-4 px-4">Jabatan</h3>

        {/* Garis Pembatas */}
        <div className="w-auto border-t-2 border-gray-300"></div>

        <div className="w-full overflow-y-auto flex space-x-3 py-4 px-4">
          <div className="border-2 border-blue-700 w-5 h-5 rounded-full"></div>
          <div>
            <p>{data.position}</p>
            <p className="font-light text-gray-500 text-sm">{data.status}</p>
            <p className="font-light text-gray-500 text-sm">{data.hireDate}</p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
        <h3 className="text-xl font-semibold py-4 px-4">Berkas</h3>

        {/* Garis Pembatas */}
        <div className="w-auto border-t-2 border-gray-300"></div>

        <div className="w-full overflow-y-auto flex justify-evenly py-4 px-4">
          <div>
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="KTP"
              width={600}
              height={400}
              className="w-full h-auto px-4"
            />
            <div className="p-4 flex items-center justify-center">
              <p className="text-center">KTP.pdf</p>
            </div>
          </div>
          {/* Garis Putus-Putus Pembatas */}
          <div className="border-l-2 border-dashed border-gray-500 h-auto"></div>
          <div>
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="KTP"
              width={600}
              height={400}
              className="w-full h-auto px-4"
            />
            <div className="p-4 flex items-center justify-center">
              <p className="text-center">Kartu Keluarga.pdf</p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-gray-500 h-auto"></div>
          <div>
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="KTP"
              width={600}
              height={400}
              className="w-full h-auto px-4"
            />
            <div className="p-4 flex items-center justify-center">
              <p className="text-center">NPWP.pdf</p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-gray-500 h-auto"></div>
          <div>
            <Image
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="KTP"
              width={600}
              height={400}
              className="w-full h-auto px-4"
            />
            <div className="p-4 flex items-center justify-center">
              <p className="text-center">Ijazah Terakhir.pdf</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
