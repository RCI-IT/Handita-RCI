"use client";

import { Employee } from "@/types/daftarKaryawan";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  UseFormSetError,
} from "react-hook-form";

const inputNumberOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // Allow only numeric characters, Backspace, and Arrow keys
  if (
    !/^\d$/.test(e.key) && // Check if the key is a numeric digit
    e.key !== "Backspace" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Delete" // Optional: if you want to allow Delete as well
  ) {
    e.preventDefault();
  }
};

// Fungsi untuk memformat input sesuai dengan format yang diinginkan
// const formatEmployeeNumber = (value: string) => {
//   // Hapus semua karakter selain angka
//   const cleanedValue = value.replace(/[^\d]/g, "");

//   // Pisahkan angka menjadi dua bagian
//   const firstPart = cleanedValue.slice(0, 2); // Dua digit pertama
//   const secondPart = cleanedValue.slice(2); // Sisanya

//   // Format bagian kedua dengan pemisah ribuan
//   const formattedSecondPart = secondPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   // Gabungkan bagian pertama dan kedua dengan titik di antara keduanya
//   const formattedValue = `${firstPart}.${formattedSecondPart}`;

//   return formattedValue;
// };

export const RenderStepFields = (
  step: number,
  control: Control<Employee>,
  errors: FieldErrors<Employee>,
  setValue: UseFormSetValue<Employee>,
  watch: UseFormWatch<Employee>,
  setError: UseFormSetError<Employee>
) => {
  // handle file change
  // const handleFileChange = (e) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     // Check if file size exceeds 2MB
  //     if (file.size > 2 * 1024 * 1024) {
  //       // Handle error (you can set an error here)
  //       console.log("File size should be less than 2MB");
  //     } else {
  //       // Set the file in the form data
  //       setValue("document.idCard", file);
  //     }
  //   }
  // };

  {
    /* <input
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
                /> */
  }

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
                  name="employeeNumber"
                  control={control}
                  rules={{
                    required: "Nomor Karyawan harus diisi",
                    validate: (value) => {
                      const cleanedValue = value.replace(/[^\d]/g, ""); // Hapus karakter selain angka
                      return (
                        cleanedValue.length === 11 ||
                        "Nomor pegawai harus 11 digit"
                      ); // Pesan error jika panjang bukan 11 digit
                    },
                    pattern: {
                      value: /^[0-9]+(\.[0-9]+)?(\.[0-9]+)?$/, // Validasi: hanya angka dan titik yang diperbolehkan
                      message: "Only valid numeric values are allowed",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="employeeNumber"
                      onKeyDown={inputNumberOnly}
                      // onChange={(e) =>
                      //   field.onChange(formatEmployeeNumber(e.target.value))
                      // } // Format angka sebelum update nilai form
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.employeeNumber && (
                    <p>{errors.employeeNumber.message}</p>
                  )}
                </span>
              </div>
            </div>
            {/*<div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Nama</p>
              <div className="w-3/4">
                <Controller
                  name="fullName"
                  control={control}
                  rules={{
                    required: "Nama harus diisi",
                    minLength: {
                      value: 3,
                      message: "Nama harus lebih dari 3 karakter",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.fullName && <p>{errors.fullName.message}</p>}
                </span>
              </div>
            </div>
             <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>NIK</p>
              <div className="w-3/4">
                <Controller
                  name="idCardNumber"
                  control={control}
                  rules={{
                    required: "NIK harus diisi",
                    validate: (value) => {
                      const cleanedValue = value.replace(/[^\d]/g, ""); // Hapus karakter selain angka
                      return cleanedValue.length === 16 || "NIK harus 16 digit"; // Pesan error jika panjang bukan 11 digit
                    },
                    // validate: async (value) => {
                    //   const isUnique = await checkUniqueData(
                    //     value,
                    //     "idCardNumber",
                    //     // Update the following line to your API endpoint
                    //     "https://your-api-endpoint.com/check-unique-nik"
                    //   );
                    //   return isUnique;
                    // },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="idCardNumber"
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.idCardNumber && <p>{errors.idCardNumber.message}</p>}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Alamat</p>
              <div className="w-3/4">
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: "Alamat harus diisi",
                    minLength: {
                      value: 3,
                      message: "Alamat harus lebih dari 3 karakter",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="address"
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.address && <p>{errors.address.message}</p>}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Tempat Lahir</p>
              <div className="w-3/4">
                <Controller
                  name="birth"
                  control={control}
                  rules={{
                    required: "Tempat lahir harus diisi",
                    minLength: {
                      value: 3,
                      message: "Tempat lahir harus lebih dari 3 karakter",
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="birth"
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.birth && <p>{errors.birth.message}</p>}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Tanggal Lahir</p>
              <div className="w-3/4">
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{
                    required: "Tanggal lahir harus diisi",
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
                        type="date" // Native date input
                        onChange={(e) => {
                          // Format the date as yyyy-MM-dd before submitting
                          const formattedDate = e.target.value; // e.target.value will be in yyyy-MM-dd format
                          field.onChange(formattedDate); // Set the value to React Hook Form
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.birthDate && <p>{errors.birthDate.message}</p>}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Jenis Kelamin</p>
              <div className="w-3/4">
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Jenis kelamin harus diisi",
                  }}
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <div>
                        <input
                          {...field}
                          type="radio"
                          value="pria"
                          id="pria"
                          className="mr-2"
                        />
                        <label htmlFor="pria">Pria</label>
                      </div>
                      <input
                        {...field}
                        type="radio"
                        value="wanita"
                        id="wanita"
                        className="mr-2"
                      />
                      <label htmlFor="wanita">Wanita</label>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Agama</p>
              <div className="w-3/4">
                <Controller
                  name="religion"
                  control={control}
                  rules={{
                    required: "Agama harus diisi",
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    >
                      <option value="">Pilih Agama</option>
                      <option value="islam">Islam</option>
                      <option value="katholik">Katholik</option>
                      <option value="protestan">Kristen Protestan</option>
                      <option value="hindu">Hindu</option>
                      <option value="budha">Budha</option>
                    </select>
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.religion && <p>{errors.religion.message}</p>}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Email</p>
              <div className="w-3/4">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email harus diisi",
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="address"
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.email && <p>{errors.email.message}</p>}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between w-3/4 ">
              <p>Nomor Whatsapp</p>
              <div className="w-3/4">
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Kontak harus diisi",
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                    />
                  )}
                />
                <span className="text-errorFormColor text-xs">
                  {errors.phone && <p>{errors.phone.message}</p>}
                </span>
              </div>
            </div> */}
          </div>
        </div>
      );
    case 1:
      return (
        <div className="w-3/4 flex flex-col space-y-6 p-6">
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Pendidikan Terakhir</p>
            <div className="w-3/4">
              <Controller
                name="education"
                control={control}
                rules={{
                  required: "Pendidikan terakhir harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="education"
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.education && <p>{errors.education.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Jurusan</p>
            <div className="w-3/4">
              <Controller
                name="major"
                control={control}
                rules={{
                  required: "Jurusan harus diisi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="major"
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.major && <p>{errors.major.message}</p>}
              </span>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-3/4 flex flex-col space-y-6 p-6">
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Posisi</p>
            <div className="w-3/4">
              <Controller
                name="position"
                control={control}
                rules={{
                  required: "Posisi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="position"
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.position && <p>{errors.position.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Status</p>
            <div className="w-3/4">
              <Controller
                name="status"
                control={control}
                rules={{
                  required: "Status harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="status"
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.status && <p>{errors.status.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Tanggal Mulai</p>
            <div className="w-3/4">
              <Controller
                name="hireDate"
                control={control}
                rules={{
                  required: "Tanggal mulai bekerja harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="relative max-w-sm">
                    {/* The icon div */}
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

                    {/* Date input */}
                    <input
                      {...field}
                      type="date" // Native date input
                      onChange={(e) => {
                        // Format the date as yyyy-MM-dd before submitting
                        const formattedDate = e.target.value; // e.target.value will be in yyyy-MM-dd format
                        field.onChange(formattedDate); // Set the value to React Hook Form
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.hireDate && <p>{errors.hireDate.message}</p>}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-between w-3/4 ">
            <p>Gaji</p>
            <div className="w-3/4">
              <Controller
                name="salary"
                control={control}
                rules={{
                  required: "Posisi harus diisi",
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="salary"
                    className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  />
                )}
              />
              <span className="text-errorFormColor text-xs">
                {errors.salary && <p>{errors.salary.message}</p>}
              </span>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full grid grid-cols-2 gap-6 p-6">
          <div className="space-y-2 w-auto">
            <p>KTP</p>
            <div className="w-fit">
              <label>
                <Controller
                  name="document.idCard"
                  control={control}
                  rules={{ required: "*Kolom ini wajib diisi" }}
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
                            className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase"
                            onClick={() => {
                              field.onChange(null); // Clears the file field
                            }}
                          >
                            Ganti
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                            Click to Upload File
                          </span>
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
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files
                            ? e.target.files[0]
                            : null;
                          if (file) {
                            // Check if file size exceeds 2MB
                            if (file.size > 2 * 1024 * 1024) {
                              setError("document.idCard", {
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
                {/* {watch("document.idCard") !== null ||
                watch("document.idCard") !== undefined ? (
                  <p
                    onClick={() => {
                      // Using the field's onChange to clear the file when "Hapus" is clicked
                      setValue("document.idCard", null); // Clears the file from the form control
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    Hapus
                  </p>
                ) : (
                  ""
                )} */}
              </label>
              {/* Error handling */}
              {errors.document?.idCard && (
                <p className="text-red-500 text-sm">
                  {errors.document?.idCard.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 w-auto">
            <p>NPWP</p>
            <div className="w-fit">
              <label>
                <Controller
                  name="document.taxCard"
                  control={control}
                  rules={{ required: "*Kolom ini wajib diisi" }}
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
                            className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase"
                            onClick={() => {
                              field.onChange(null); // Clears the file field
                            }}
                          >
                            Ganti
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                            Click to Upload File
                          </span>
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
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files
                            ? e.target.files[0]
                            : null;
                          if (file) {
                            // Check if file size exceeds 2MB
                            if (file.size > 2 * 1024 * 1024) {
                              setError("document.taxCard", {
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
              {/* Error handling */}
              {errors.document?.taxCard && (
                <p className="text-red-500 text-sm">
                  {errors.document?.taxCard.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 w-auto">
            <p>Kartu Keluarga</p>
            <div className="w-fit">
              <label>
                <Controller
                  name="document.familyCard"
                  control={control}
                  rules={{ required: "*Kolom ini wajib diisi" }}
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
                            className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase"
                            onClick={() => {
                              field.onChange(null); // Clears the file field
                            }}
                          >
                            Ganti
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                            Click to Upload File
                          </span>
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
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files
                            ? e.target.files[0]
                            : null;
                          if (file) {
                            // Check if file size exceeds 2MB
                            if (file.size > 2 * 1024 * 1024) {
                              setError("document.familyCard", {
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
              {/* Error handling */}
              {errors.document?.familyCard && (
                <p className="text-red-500 text-sm">
                  {errors.document?.familyCard.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 w-auto">
            <p>Ijazah Terakhir</p>
            <div className="w-fit">
              <label>
                <Controller
                  name="document.diploma"
                  control={control}
                  rules={{ required: "*Kolom ini wajib diisi" }}
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
                            className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase"
                            onClick={() => {
                              field.onChange(null); // Clears the file field
                            }}
                          >
                            Ganti
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                            Click to Upload File
                          </span>
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
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files
                            ? e.target.files[0]
                            : null;
                          if (file) {
                            // Check if file size exceeds 2MB
                            if (file.size > 2 * 1024 * 1024) {
                              setError("document.diploma", {
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
              {/* Error handling */}
              {errors.document?.diploma && (
                <p className="text-red-500 text-sm">
                  {errors.document?.diploma.message}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    default:
      return <p>Step tidak diketahui</p>;
  }
};
