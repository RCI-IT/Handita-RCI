"use client";

import { TypeKaryawan } from "@/types/daftarKaryawan";
import { Controller, Control, FieldErrors } from "react-hook-form";


export const renderStepFields = (
  step: number,
  control: Control<TypeKaryawan>,
  errors: FieldErrors<TypeKaryawan>
) => {
  switch (step) {
    case 0:
      return (
        <div className="flex md:space-x-6 items-start p-6 w-full">
          {/* Render your fields for step 0 using Controller */}
          {/* Input Gambar */}
          <div className="w-[10%] overflow-hidden">
            <label className="w-full flex flex-col items-center"></label>
          </div>

          <div className="w-3/4 flex flex-col space-y-6 px-6">
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Nomor Karyawan</p>
              <div className="w-3/4">
                <Controller
                  name="nama"
                  control={control}
                  rules={{
                    required: "Nama is required",
                    minLength: {
                      value: 3,
                      message: "Nama harus lebih dari 3 karakter",
                    },
                  }}
                  render={({ field }) => <input {...field} id="name" />}
                />
                {errors.nama && <p>{errors.nama.message}</p>}
                <input
                  type="text"
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  onKeyDown={(e) => {
                    // Allow only numeric characters, backspace, and arrow keys
                    if (
                      !/^[0-9]$/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>NIK</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Jenis Kelamin</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Alamat</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Tempat Lahir</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Tanggal Lahir</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Agama</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Email</p>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Nomor Whatsapp</p>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="w-3/4 flex flex-col space-y-6 p-6">
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Pendidikan Terakhir</p>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Jurusan</p>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-3/4 flex flex-col space-y-6 p-6">
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Posisi</p>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Status</p>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Tanggal Mulai</p>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Gaji</p>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full grid grid-cols-2 gap-6 p-6">
          <div className="space-y-2 w-auto">
            <p>KTP</p>
            <div className="w-fit">
              <label></label>
            </div>
          </div>
          <div className="space-y-2 w-auto">
            <p>NPWP</p>
            <div className="w-fit">
              <label></label>
            </div>
          </div>
          <div className="space-y-2 w-auto">
            <p>Kartu Keluarga</p>
            <div className="w-fit">
              <label></label>
            </div>
          </div>
          <div className="space-y-2 w-auto">
            <p>Ijazah Terakhir</p>
            <div className="w-fit">
              <label></label>
            </div>
          </div>
        </div>
      );
    default:
      return <p>Step tidak diketahui</p>;
  }
};
