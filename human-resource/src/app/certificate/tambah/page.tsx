"use client";

import Breadcrumb from "@/components/breadcrumb";
import { LoadingOffPage } from "@/handler/loading";
import { Certificate } from "@/types/certificateType";
import { inputNumberOnly } from "@/utils/numberOnly";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CertificateAdd() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Certificate>({
    mode: "onBlur",
  });

  const [loadSubmit, setLoadSubmit] = useState(false);
  const onSubmit = async (data: Certificate) => {
    try {
      setLoadSubmit(true);
      // Tampilkan data yang diinput di console
      console.log("Data yang disubmit: ", data);
    //   await postKaryawanWithFile(data);
      setLoadSubmit(false);
      alert("Data sudah di submit");
    } catch {
      setLoadSubmit(false);
      alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
    }
  };

  return (
    <div className="w-full space-y-5">
      {loadSubmit && <LoadingOffPage />}
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">
          Sertifikat Keahlian Kerja
        </p>
        <Breadcrumb />
      </nav>

      <div className="min-w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
                    <p>Nomor Certificate</p>
                    <div className="w-3/4">
                      <Controller
                        name="certificateNo"
                        control={control}
                        rules={{
                          required: "Nomor Sertifikat harus diisi",
                        //   validate: (value) => {
                        //     const cleanedValue = value.replace(/[^\d]/g, ""); // Hapus karakter selain angka
                        //     // Validasi panjang nomor pegawai harus 11 digit
                        //     if (cleanedValue.length !== 11) {
                        //       return "Nomor pegawai harus 11 digit";
                        //     }

                        //     // Validasi hanya angka yang diperbolehkan
                        //     if (!/^[0-9]+$/.test(cleanedValue)) {
                        //       return "Hanya angka yang valid";
                        //     }

                        //     // Validasi perulangan untuk cek duplikasi
                        //     const isDuplicate = checkDuplicate(
                        //       cleanedValue,
                        //       existingEmployeeNumbers
                        //     );
                        //     if (isDuplicate) {
                        //       return "Nomor pegawai sudah terdaftar";
                        //     }

                        //     return true;
                        //   },
                        //   pattern: {
                        //     value: /^[0-9]+(\.[0-9]+)?(\.[0-9]+)?$/, // Validasi: hanya angka dan titik yang diperbolehkan
                        //     message: "Only valid numeric values are allowed",
                        //   },
                        }}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            id="employeeNumber"
                            maxLength={11}
                            onKeyDown={inputNumberOnly}
                            className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                          />
                        )}
                      />
                      <span className="text-errorFormColor text-xs">
                        {errors.certificateNo && (
                          <p>{errors.certificateNo.message}</p>
                        )}
                      </span>
                    </div>
                  </div>
        </form>
      </div>
    </div>
  );
}
