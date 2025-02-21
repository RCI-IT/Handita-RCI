"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Fragment, useState } from "react";
import { renderStepFields } from "./formStep";
import { useForm } from "react-hook-form";
import { TypeKaryawan } from "@/types/daftarKaryawan";


export default function TambahKaryawan() {
  const steps = ["Informasi Pribadi", "Pendidikan", "Jabatan", "Berkas"];
  const [step, setStep] = useState(0);
  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleNext = async () => {
    // Trigger validation for all fields
    // const isValid = await trigger();

    // if (isValid) {
    // Proceed to the next step
    // Your existing logic for moving to the next step
    setStep((prevStep) => prevStep + 1);
    // } else {
    // Display error messages or handle them as needed
    //   console.log("Validation errors, cannot proceed to the next step");
    //   setShowError(true);
    // }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeKaryawan>();

  const onSubmit = (data: TypeKaryawan) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="w-full pt-8 pr-6">
      <nav>
        <p className="text-3xl font-semibold text-[#282828]">Karyawan</p>

        {/* ---------------- Breadcrumb ---------------- */}
        <Breadcrumb />
      </nav>

      <div className="pt-5 space-y-5 relative">
        {/* ---------------- Form Tambah Karyawan ---------------- */}
        From Tambah Karyawan
        {/* Island Pembagian 4 Steps */}
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
        {/* Form yang Harus Diisi */}
        <div className="min-w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full p-6 border-b-2 border-b-gray-200">
              <p className="font-thin text-[#282828] text-xl">{steps[step]}</p>
            </div>

            {renderStepFields(step, control, errors)}         

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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
