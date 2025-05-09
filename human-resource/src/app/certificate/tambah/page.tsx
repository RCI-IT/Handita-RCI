"use client";

import Breadcrumb from "@/components/breadcrumb";
import { LoadingOffPage } from "@/handler/loading";
import {
  postCertificateWithFile,
  useCertificate,
} from "@/services/apiCertificate";
import { useKaryawanData } from "@/services/apiKaryawan";
import { Certificate } from "@/types/certificateType";
import { checkDuplicate } from "@/utils/checkDuplicate";
import { inputNumberOnly } from "@/utils/numberOnly";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export default function CertificateAdd() {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Certificate>({
    mode: "onBlur",
  });

  const status = watch("status");
  const issueDate = watch("issueDate");

  const [loadSubmit, setLoadSubmit] = useState(false);
  const onSubmit = async (data: Certificate) => {
    try {
      setLoadSubmit(true);
      // Tampilkan data yang diinput di console
      console.log("Data yang disubmit: ", data);
      await postCertificateWithFile(data);
      setLoadSubmit(false);
      alert("Data sudah di submit");
    } catch {
      setLoadSubmit(false);
      alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
    }
  };

  const {
    data: dataKaryawan,
    error: err1,
    isLoading: load1,
    isNotFound: notFound1,
  } = useKaryawanData();
  const {
    data: dataCertificate,
    error: err2,
    isLoading: load2,
    isNotFound: notFound2,
  } = useCertificate();

  if (err1 || load1 || notFound1) return "Data Karyawan Tidak Ada";
  if (err2 || load2 || notFound2) return "Tidak bisa dikonfirmasi";

  const karyawanOptions = Array.isArray(dataKaryawan)
    ? dataKaryawan.map((karyawan) => ({
        value: karyawan.id,
        label: karyawan.fullName,
      }))
    : [];

  const existingCertificateNo: string[] = [];
  if (Array.isArray(dataCertificate)) {
    dataCertificate.forEach((certificate) => {
      existingCertificateNo.push(certificate.certificateNo);
    });
  }

  return (
    <div className="w-full space-y-5">
      {loadSubmit && <LoadingOffPage />}
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">
          Sertifikat Keahlian Kerja
        </p>
        <Breadcrumb />
      </nav>

      <div className="min-w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex w-3/4 items-center justify-between">
            <p>File</p>
            <label className="w-3/4">
              <Controller
                name="certificate"
                control={control}
                rules={{ required: "Tambahkan file input" }}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    {field.value && field.value instanceof File ? (
                      <>
                        <a
                          href={URL.createObjectURL(field.value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300"
                        >
                          <p>
                            {field.value
                              ? field.value.name.length <= 20
                                ? field.value.name
                                : field.value.name.slice(0, 20) + "..."
                              : ""}
                          </p>
                        </a>
                        <p
                          className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400
                                   transition transform duration-200 ease-in-out hover:scale-100 active:scale-95
                                    focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium"
                          onClick={() => {
                            field.onChange(null); // Clears the file field
                          }}
                        >
                          Ganti
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400
                                   transition transform duration-200 ease-in-out hover:scale-100 active:scale-95
                                  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium"
                        >
                          Click to Upload File
                        </p>
                        <span className="text-sm text-blueBase rounded-lg border-2 border-gray-50 px-2 py-2 bg-[#EBF2FD] dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                          Image
                        </span>
                        <span className="text-sm text-blueBase rounded-lg border-2 border-gray-50 px-2 py-2 bg-[#FFFFFF] dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                          {"<"} 2 MB
                        </span>
                      </>
                    )}
                    <input
                      {...field}
                      type="file"
                      value={undefined}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          // Check if file size exceeds 2MB
                          if (file.size > 2 * 1024 * 1024) {
                            setError("certificate", {
                              type: "manual",
                              message: "File size should be less than 2MB",
                            });
                          } else {
                            field.onChange(file);
                          }
                        }
                      }}
                    />
                  </div>
                )}
              />
            </label>
            {errors.certificate && (
              <p className="text-red-500 text-sm">
                {errors.certificate.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Karyawan</p>
            <div className="w-3/4">
              <Controller
                name="employeeId"
                control={control}
                rules={{
                  required: "Nama karyawan harus di isi",
                }}
                render={({ field }) => (
                  <Select
                    options={karyawanOptions}
                    isClearable
                    placeholder="Pilih karyawan yang memiliki SKK"
                    value={karyawanOptions.find(
                      (option) => option.value === field.value
                    )} // 🔧 convert string to object
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    } // 🔄 save as string
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.employeeId && <p>{errors.employeeId.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Nomor Certificate</p>
            <div className="w-3/4">
              <Controller
                name="certificateNo"
                control={control}
                rules={{
                  required: "Nomor Sertifikat harus diisi",
                  validate: (value) => {
                    const isDuplicate = checkDuplicate(
                      value,
                      existingCertificateNo
                    );
                    if (isDuplicate) return "Nomor sertifikat sudah ada";

                    return true;
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.certificateNo && <p>{errors.certificateNo.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Kualifikasi</p>
            <div className="w-3/4">
              <Controller
                name="qualification"
                control={control}
                rules={{
                  required: "Kualifikasi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.qualification && <p>{errors.qualification.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Sub-Kualifikasi</p>
            <div className="w-3/4">
              <Controller
                name="subQualification"
                control={control}
                rules={{
                  required: "Sub-Kualifikasi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.subQualification && (
                  <p>{errors.subQualification.message}</p>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Nomor Registrasi</p>
            <div className="w-3/4">
              <Controller
                name="registrationNo"
                control={control}
                rules={{
                  required: "Sub-Kualifikasi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.registrationNo && (
                  <p>{errors.registrationNo.message}</p>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Level</p>
            <div className="w-3/4">
              <Controller
                name="level"
                control={control}
                rules={{
                  required: "Sub-Kualifikasi harus diisi",
                  max: 7,
                }}
                defaultValue={1}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    onKeyDown={inputNumberOnly}
                    max={7}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.registrationNo && (
                  <p>{errors.registrationNo.message}</p>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Tanggal terbit</p>
            <div className="w-3/4">
              <Controller
                name="issueDate"
                control={control}
                rules={{
                  required: "Tanggal terbit harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      {...field}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.issueDate && <p>{errors.issueDate.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Tanggal expired</p>
            <div className="w-3/4">
              <Controller
                name="expireDate"
                control={control}
                rules={{
                  required: "Tanggal terbit harus diisi",
                  validate: (value) => {
                    if (issueDate > value)
                      return "Tanggal expired tidak boleh sebelum tanggal terbit!";
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      {...field}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.expireDate && <p>{errors.expireDate.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Status</p>
            <div className="w-3/4">
              <Controller
                name="status"
                control={control}
                defaultValue="BELUM TERPAKAI"
                render={({ field }) => {
                  const isChecked = field.value === "terpakai";

                  const handleChange = () => {
                    field.onChange(isChecked ? "belum terpakai" : "terpakai");
                  };
                  return (
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        {...field}
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300
                          dark:peer-focus:ring-blue-800 dark:bg-gray-700
                          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                          peer-checked:after:border-white after:content-['']
                          after:absolute after:top-0.5 after:start-[2px] after:bg-white
                          after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                          after:transition-all dark:border-gray-600
                          peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
                      ></div>
                      <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {isChecked ? "Terpakai" : "Belum Terpakai"}
                      </span>
                    </label>
                  );
                }}
              />
              <span className="text-errorFormColor text-xs">
                {errors.status && <p>{errors.status.message}</p>}
              </span>
            </div>
          </div>
          {status === "terpakai" && (
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Perusahaan</p>
              <div className="w-3/4">
                <Controller
                  name="company"
                  control={control}
                  rules={{
                    required: "Jika terpakai, isi nama perusahaan",
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.company && <p>{errors.company.message}</p>}
                </span>
              </div>
            </div>
          )}

          {/* Jika ada akun */}
          <p className="bg-blue-700 text-white capitalize">Akun SKK</p>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Username Akun</p>
            <div className="w-3/4">
              <Controller
                name="account"
                control={control}
                rules={{
                  required: "Sub-Kualifikasi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.account && <p>{errors.account.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Password</p>
            <div className="w-3/4">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Sub-Kualifikasi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.password && <p>{errors.password.message}</p>}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <div className="w-full p-6 border-t-2 border-t-gray-200 flex justify-end">
            <button
              type="submit"
              className={`w-24 rounded-lg border-2 flex justify-center items-center dark:placeholder-gray-400 font-medium transform duration-200 transition
              ${
                loadSubmit
                  ? "text-slate-200 border-gray-200 dark:border-gray-600 disabled cursor-none scale-95"
                  : "hover:border-blueBase hover:text-blueBase hover:bg-blueBg border-gray-600 dark:border-gray-600 scale-100"
              }
            `}
            >
              {loadSubmit ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 text-blueBase animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
