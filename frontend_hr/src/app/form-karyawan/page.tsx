"use client";

import Breadcrumb from "@/components/breadcrumb";
// import { ButtonComponent } from "@/components/button";
import { TypeKaryawan } from "@/types/daftarKaryawan";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSolidImageAdd } from "react-icons/bi";
import Image from "next/image";
import toast from "react-hot-toast";
// import { Fetcher, postFormData } from "@/components/api";
const url = "http://localhost:4000";
import axios from "axios";
import useSWR from "swr";
import { checkUniqueData } from "@/function/check-unique";

export default function TambahKaryawan() {
  const [step, setStep] = useState(0);
  const steps = ["Informasi Pribadi", "Pendidikan", "Jabatan", "Berkas"];

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const [showError, setShowError] = useState(false);
  const handleNext = async () => {
    // Trigger validation for all fields
    const isValid = await trigger();

    if (isValid) {
      // Proceed to the next step
      // Your existing logic for moving to the next step
      setStep((prevStep) => prevStep + 1);
    } else {
      // Display error messages or handle them as needed
      console.log("Validation errors, cannot proceed to the next step");
      setShowError(true);
    }
  };

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    trigger,
  } = useForm<TypeKaryawan>({
    mode: "onChange",
    // defaultValues: {
    //   employeeNumber: "",
    //   idCardNumber: "",
    //   fullName: "",
    //   birth: "",
    //   birthDate: "",
    //   gender: "",
    //   religion: "",
    //   address: "",
    //   email: "",
    //   phone: "",
    //   education: "",
    //   major: "",
    //   position: "",
    //   status: "",
    //   salary: 0,
    //   hireDate: "",
    // },
  });

  const renderStepFields = (step: number) => {
    switch (step) {
      case 0:
        return <InformasiPribadi control={control} />;
      case 1:
        return <Pendidikan />;
      case 2:
        return <Jabatan />;
      case 3:
        return <Berkas />;
      default:
        return null;
    }
  };
  

  const [loadSubmit, setLoadSubmit] = useState(false);

  // Define the type for the data object (use a more specific type if needed)
  type FormDataObject = {
    [key: string]: string | File | null | undefined;
  };

  const onSubmit = async (data: FormDataObject) => {
    try {
      setLoadSubmit(true);
      // const simpan = await axios.post(url, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      //   const simpan = await postFormData(url, data);
      // Handle the response, e.g., show a success message or navigate to a different page
      toast.success("Successfully created!");

      console.log(data);

      setLoadSubmit(false);

      setTimeout(() => {
        window.location.href = "/personalia/karyawan/";
      }, 3000);
    } catch (error) {
      console.error("Error saving data", error);
      setLoadSubmit(false);
    }
  };

  const Agama = [
    "Islam",
    "Katolik",
    "Protestan",
    "Hindu",
    "Buddha",
    "Konghucu",
  ];

  const PendidikanTerakhir = ["SMA/SLTA", "D3", "D4/S1", "S2"];

  // const document = [
  //   { label: "KTP", name: "idcard" },
  //   { label: "NPWP", name: "taxCard" },
  //   { label: "Kartu Keluarga", name: "familyCard" },
  //   { label: "Ijazah", name: "diploma" },
  // ];

  //   const { data: apiData } = useSWR(url, Fetcher);

  return (
    <div className="w-full pt-8 pr-6">
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">Karyawan</p>

        {/* ---------------- Breadcrumb ---------------- */}
        <Breadcrumb />
      </nav>

      <div className="pt-5 space-y-5 relative">
        <div className="min-w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white p-6 items-center flex justify-between">
          {steps.map((label, index) => (
            <Fragment key={index}>
              <div
                className={`flex items-center space-x-3 ${
                  step + 1 > index ? "text-[#252525]" : "text-slate-200"
                }`}
              >
                <div
                  className={`border rounded-full w-5 h-5 ${
                    step + 1 > index ? "border-blue-800" : "border-slate-200"
                  }`}
                />
                <p>
                  0{index + 1} {label}
                </p>
              </div>

              <div
                className={`w-56 h-[2px] bg-slate-400 rounded-lg ${
                  index === steps.length - 1 ? "hidden" : ""
                }`}
              />
            </Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
            <div className="w-full p-6 border-b-2 border-b-gray-200">
              <p className="font-thin text-[#282828] text-xl">{steps[step]}</p>
            </div>

            {renderStepFields(step)}

            <div className="w-full p-6 border-t-2 border-t-gray-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={step > 0 ? false : true}
                className={`w-24 rounded-lg border-2 px-2 py-2 focus:outline-none dark:placeholder-gray-400 font-medium ${
                  step > 0
                    ? "text-[#252525] border-gray-600 dark:border-gray-600 "
                    : "text-slate-200 border-gray-200 dark:border-gray-600 "
                }`}
              >
                Previous
              </button>

              {step < steps.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`w-24 rounded-lg border-2 px-2 py-2 focus:outline-none dark:placeholder-gray-400 font-medium ${
                    step < steps.length - 1
                      ? "text-[#252525] border-gray-600 dark:border-gray-600 "
                      : "text-slate-200 border-gray-200 dark:border-gray-600 "
                  }`}
                  // disabled={!isValid}
                >
                  Next
                </button>
              )}
              {/* {step === steps.length - 1 && (
                <ButtonComponent type="submit" variant="primary">
                  {loadSubmit ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
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
                      Loading...
                    </>
                  ) : (
                    <p>Save</p>
                  )}
                </ButtonComponent>
              )} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


const InformasiPribadi = ({control}: any) => {
  return (
    <div className="flex md:space-x-6 items-start p-6 w-full">
      {/* Input Gambar */}
      <div className="w-[10%] overflow-hidden">
        <label className="w-full flex flex-col items-center">
          {/* <Controller
            name="image"
            control={control}
            rules={{
              required: "*Kolom ini wajib diisi",
              validate: async (file) => {
                if (file) {
                  // Check if file size exceeds 2MB
                  if (file.size > 2 * 1024 * 1024) {
                    return "File size should be less than 2MB";
                  }
                }
              },
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="file"
                  className="hidden"
                  accept="image/*" // Accept images only
                  value={undefined} // Set value to undefined for a file input
                  onChange={(e) => {
                    const file = e.target.files
                      ? e.target.files[0]
                      : null;
                    if (file) {
                      field.onChange(file);
                    }
                    setValue(field.name, file!);
                  }}
                />
                {field.value &&
                  field.value instanceof File &&
                  !errors["image"] && (
                    <>
                      <div className="w-full relative h-0 pt-[150%] overflow-hidden mb-2 bg-gray-100 rounded-md border border-dashed border-gray-400">
                        <Image
                          src={URL.createObjectURL(field.value)}
                          alt=""
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          loading="lazy"
                          className="absolute"
                        />
                      </div>
                      <p className="px-2 py-1 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
                        Ganti
                      </p>
                    </>
                  )}
                <div>
                  {(field.value === undefined ||
                    field.value instanceof FileList ||
                    errors["image"]) && (
                    // <BiSolidImageAdd className="text-9xl" />
                    <p className="px-2 py-1 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
                      Upload
                    </p>
                  )}
                </div>
              </>
            )}
          /> */}
        </label>
        {/* {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )} */}
      </div>
      <div className="w-3/4 flex flex-col space-y-6 px-6">
        {/* Nomor Karyawan */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Nomor Karyawan</p>
          <Controller
            name="employeeNumber"
            control={control}
            rules={{
              required: "*Kolom ini wajib diisi",
              // validate: async (value) => {
              //   const isUnique = await checkUniqueData(
              //     value,
              //     "employeeNumber",
              //     apiData
              //   ); // Check that the value is unique
              //   if (!isUnique) {
              //     return "*Nomor karyawan sudah terdaftar.";
              //   }
              // },
            }}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  {...field}
                  type="text"
                  placeholder={"Nomor Karyawan"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  // onChange={(e) => {
                  //   field.onChange(e.target.value);
                  //   setValue(field.name, e.target.value);
                  // }}
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
                {isDirty && errors.employeeNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.employeeNumber.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        {/* Nama */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Nama</p>
          {/* <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  {...field}
                  type="text"
                  placeholder={"Nama Karyawan"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {isDirty && errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* NIK */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>NIK</p>
          {/* <Controller
            name="idCardNumber"
            control={control}
            rules={{
              required: "*Kolom ini wajib diisi",
              validate: async (value) => {
                const isUnique = await checkUniqueData(
                  value,
                  "idCardNumber",
                  apiData
                ); // Check that the value is unique
                if (!isUnique) {
                  return "*NIK sudah terdaftar.";
                }
              },
            }}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  {...field}
                  type="text"
                  placeholder={"NIK"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
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

                    // Get the input element
                    const inputElement = e.target as HTMLInputElement;

                    // Check if the input length will exceed the maximum allowed length (16)
                    if (
                      inputElement.value.length >= 16 &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                {isDirty && errors.idCardNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.idCardNumber.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* Jenis Kelamin */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Jenis Kelamin</p>
          <div className="w-3/4">
            {/* <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="w-full flex space-x-14">
                  <div className="flex space-x-2">
                    <input
                      {...field}
                      type="radio"
                      value={`L`}
                      onChange={(e) => {
                        setValue(field.name, "L");
                        field.onChange(e.target.value);
                      }}
                      checked={field.value === `L`}
                    />
                    <p>Laki-laki</p>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      {...field}
                      type="radio"
                      value={`P`}
                      onChange={(e) => {
                        setValue(field.name, "P");
                        field.onChange(e.target.value);
                      }}
                      checked={field.value === `P`}
                    />
                    <p>Perempuan</p>
                  </div>
                </div>
              )}
            /> 
            {isDirty && errors.gender && (
              <p className="text-red-500 text-sm">
                {errors.gender.message}
              </p>
            )}*/}
          </div>
        </div>
        {/* Alamat */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Alamat</p>
          {/* <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <div className="w-3/4">
                <textarea
                  {...field}
                  placeholder={"Alamat"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {isDirty && errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* Tempat Lahir */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Tempat Lahir</p>
          {/* <Controller
            name="birth"
            control={control}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  type="text"
                  {...field}
                  placeholder={"Tempat Lahir"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {isDirty && errors.birth && (
                  <p className="text-red-500 text-sm">
                    {errors.birth.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* Tanggal Lahir */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Tanggal Lahir</p>
          {/* <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  type="date"
                  {...field}
                  placeholder={"Tanggal Lahir"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2 appearance-none"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {isDirty && errors.birthDate && (
                  <p className="text-red-500 text-sm">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* Agama */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Agama</p>
          {/* <Controller
            name="religion"
            control={control}
            // rules={{ required: "*Kolom ini wajib diisi" }}
            render={({ field }) => (
              <div className="w-3/4">
                <select
                  {...field}
                  placeholder={"Agama"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2 bg-white"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Pilihan
                  </option>
                  {Agama.map((agama, index) => (
                    <option key={index} value={agama.toLowerCase()}>
                      {agama}
                    </option>
                  ))}
                </select>
                {isDirty && errors.religion && (
                  <p className="text-red-500 text-sm">
                    {errors.religion.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* Email */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Email</p>
          {/* <Controller
            name="email"
            control={control}
            rules={{
              required: "*Kolom ini wajib diisi",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Alamat email tidak valid",
              },
              validate: async (value) => {
                const isUnique = await checkUniqueData(
                  value,
                  "email",
                  apiData
                ); // Check that the value is unique
                if (!isUnique) {
                  return "*Alamat email sudah terdaftar.";
                }
              },
            }}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  type="text"
                  {...field}
                  placeholder={"Email"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2 appearance-none"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {(showError || (isDirty && errors.email)) && (
                  <p className="text-red-500 text-sm">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        {/* Whatsapp */}
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Nomor Whatsapp</p>
          {/* <Controller
            name="phone"
            control={control}
            rules={{
              required: "*Kolom ini wajib diisi",
              pattern: {
                value: /^[0-9]{10,13}$/, // Regex for 10 to 13 digits
                message: "Format nomor tidak valid",
              },
              validate: async (value) => {
                const isUnique = await checkUniqueData(
                  value,
                  "phone",
                  apiData
                ); // Check that the value is unique
                if (!isUnique) {
                  return `*Nomor telefon sudah terdafter.`;
                }
              },
            }}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  type="text"
                  {...field}
                  placeholder={"Nomor Whatsapp"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2 appearance-none"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {(showError || (isDirty && errors.phone)) && (
                  <p className="text-red-500 text-sm">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
      </div>
      {/* Add more fields for step 0 as needed */}
    </div>
  );
};

const Pendidikan = () => {
  return (
    <>
      <div className="w-3/4 flex flex-col space-y-6 p-6">
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Pendidikan Terakhir</p>
          {/* <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <div className="w-3/4">
                <select
                  {...field}
                  placeholder={"Pendidikan Terakhir"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2 bg-white"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                    console.log("Education Value:", e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Pilihan
                  </option>
                  {Pendidikan.map((pendidikan, index) => (
                    <option key={index} value={pendidikan.toLowerCase()}>
                      {pendidikan}
                    </option>
                  ))}
                </select>
                {isDirty && errors.education && (
                  <p className="text-red-500 text-sm">
                    {errors.education.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
        <div className="flex items-center space-x-4 justify-between w-3/4 ">
          <p>Jurusan</p>
          {/* <Controller
            name="major"
            control={control}
            render={({ field }) => (
              <div className="w-3/4">
                <input
                  {...field}
                  type="text"
                  placeholder={"Jurusan"}
                  className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue(field.name, e.target.value);
                  }}
                />
                {isDirty && errors.major && (
                  <p className="text-red-500 text-sm">
                    {errors.major.message}
                  </p>
                )}
              </div>
            )}
          /> */}
        </div>
      </div>
    </>
  );
};

const Jabatan = () => {
  return (
    <div className="w-3/4 flex flex-col space-y-6 p-6">
      <div className="flex items-center space-x-4 justify-between w-3/4 ">
        <p>Posisi</p>
        {/* <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <div className="w-3/4">
              <input
                type="text"
                {...field}
                placeholder={"Posisi"}
                className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  console.log("Position Value:", e.target.value);
                }}
              />
              {isDirty && errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </div>
          )}
        /> */}
      </div>
      <div className="flex items-center space-x-4 justify-between w-3/4 ">
        <p>Status</p>
        <div className="w-3/4">
          {/* <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="w-full flex space-x-14">
                <div className="flex space-x-2">
                  <input
                    {...field}
                    type="radio"
                    value={`Active`}
                    onChange={(e) => {
                      setValue(field.name, "Active");
                      field.onChange(e.target.value);
                    }}
                    checked={field.value === `Active`}
                  />
                  <p>Active</p>
                </div>
                <div className="flex space-x-2">
                  <input
                    {...field}
                    type="radio"
                    value={`Non-active`}
                    onChange={(e) => {
                      setValue(field.name, "Non-active");
                      field.onChange(e.target.value);
                    }}
                    checked={field.value === `Non-active`}
                  />
                  <p>Non-active</p>
                </div>
              </div>
            )}
          />
          {isDirty && errors.gender && (
            <p className="text-red-500 text-sm">
              {errors.gender.message}
            </p>
          )} */}
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-between w-3/4 ">
        <p>Tanggal Mulai</p>
        {/* <Controller
          name="hireDate"
          control={control}
          render={({ field }) => (
            <div className="w-3/4">
              <input
                type="date"
                {...field}
                placeholder={"Tanggal Lahir"}
                className="w-full ring-1 ring-gray-400 rounded-md px-2 py-2 appearance-none"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue(field.name, e.target.value);
                }}
              />
              {isDirty && errors.birthDate && (
                <p className="text-red-500 text-sm">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          )}
        /> */}
      </div>
      <div className="flex items-center space-x-4 justify-between w-3/4 ">
        <p>Gaji</p>
        {/* <Controller
          name="salary"
          control={control}
          rules={{
            required: "*Kolom ini wajib diisi",
          }}
          render={({ field }) => (
            <div className="w-3/4">
              <span className="w-full flex ring-1 ring-gray-400 rounded-md items-center overflow-hidden relative">
                <label className="border-r-2 border-r-gray-200 py-1 px-2 ">
                  Rp
                </label>
                <input
                  {...field}
                  type="text"
                  placeholder={"Gaji"}
                  className="w-full px-2 py-2 appearance-none outline-none"
                  value={
                    field.value
                      ? field.value
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }
                  onChange={(e) => {
                    const gaji = parseFloat(
                      e.target.value.replace(/[^0-9]/g, "")
                    );
                    setValue(field.name, gaji);
                  }}
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
              </span>
              {isDirty && errors.salary && (
                <p className="text-red-500 text-sm">
                  {errors.salary.message}
                </p>
              )}
            </div>
          )}
        /> */}
      </div>
    </div>
  );
};

const Berkas = () => {
  return (
    // <div className="w-full grid grid-cols-2 gap-6 p-6">
    //   {document.map((element, index) => (
    //     <div className="space-y-2 w-auto" key={index}>
    //       <p>{element.label}</p>
    //       <div className="w-fit">
    //         <label>
    //           <Controller
    //             name={element.name as keyof karyawanType}
    //             control={control}
    //             rules={{ required: "*Kolom ini wajib diisi" }}
    //             render={({ field }) => (
    //               <div className="flex items-center space-x-2">
    //                 {field.value && field.value instanceof File ? (
    //                   <>
    //                     <a
    //                       href={URL.createObjectURL(field.value)}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                       className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300"
    //                     >
    //                       <p>
    //                         {field.value
    //                           ? field.value.name.length <= 20
    //                             ? field.value.name
    //                             : field.value.name.slice(0, 20) + "..."
    //                           : ""}
    //                       </p>
    //                     </a>
    //                     <p className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
    //                       Ganti
    //                     </p>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <span className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
    //                       Click to Upload File
    //                     </span>
    //                     <span className="text-sm text-blueBase rounded-lg border-2 border-gray-50 px-2 py-2 bg-[#EBF2FD] dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
    //                       Image
    //                     </span>
    //                     <span className="text-sm text-blueBase rounded-lg border-2 border-gray-50 px-2 py-2 bg-[#FFFFFF] dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
    //                       {"<"} 2 MB
    //                     </span>
    //                   </>
    //                 )}
    //                 <input
    //                   {...field}
    //                   type="file"
    //                   value={undefined}
    //                   accept="image/*"
    //                   className="hidden"
    //                   onChange={(e) => {
    //                     const file = e.target.files
    //                       ? e.target.files[0]
    //                       : null;
    //                     if (file) {
    //                       // Check if file size exceeds 2MB
    //                       if (file.size > 2 * 1024 * 1024) {
    //                         setError(element.name as keyof karyawanType, {
    //                           type: "manual",
    //                           message:
    //                             "File size should be less than 2MB",
    //                         });
    //                       } else {
    //                         field.onChange(file);
    //                       }
    //                     }
    //                   }}
    //                 />
    //               </div>
    //             )}
    //           />
    //         </label>
    //       </div>
    //       {errors[element.name as keyof karyawanType] && (
    //         <p className="text-red-500 text-sm">
    //           {errors[element.name as keyof karyawanType]?.message}
    //         </p>
    //       )}
    //     </div>
    //   ))}
    // </div>

    <div className="w-full grid grid-cols-2 gap-6 p-6">
      <div className="space-y-2 w-auto">
        <p>KTP</p>
        <div className="w-fit">
          <label>
            {/* <Controller
              name="idCard"
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
                      <p className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
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
                          setError("idCard", {
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
            /> */}
          </label>
        </div>
        {/* {errors.idCard && (
          <p className="text-red-500 text-sm">{errors.idCard?.message}</p>
        )} */}
      </div>
      <div className="space-y-2 w-auto">
        <p>NPWP</p>
        <div className="w-fit">
          <label>
            {/* <Controller
              name="taxCard"
              control={control}
              // rules={{ required: "*Kolom ini wajib diisi" }}
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
                      <p className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
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
                          setError("taxCard", {
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
            />*/}
          </label>
        </div>
        {/* {errors.taxCard && (
          <p className="text-red-500 text-sm">
            {errors.taxCard?.message}
          </p>
        )} */}
      </div>
      <div className="space-y-2 w-auto">
        <p>Kartu Keluarga</p>
        <div className="w-fit">
          <label>
            {/* <Controller
              name="familyCard"
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
                      <p className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
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
                          setError("familyCard", {
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
            /> */}
          </label>
        </div>
        {/* {errors.familyCard && (
          <p className="text-red-500 text-sm">
            {errors.familyCard?.message}
          </p>
        )} */}
      </div>
      <div className="space-y-2 w-auto">
        <p>Ijazah Terakhir</p>
        <div className="w-fit">
          <label>
            {/* <Controller
              name="diploma"
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
                      <p className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase">
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
                          setError("diploma", {
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
            /> */}
          </label>
        </div>
        {/* {errors.diploma && (
          <p className="text-red-500 text-sm">
            {errors.diploma?.message}
          </p>
        )} */}
      </div>
    </div>
  );
};
