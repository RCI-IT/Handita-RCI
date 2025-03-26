// DocumentUpload.tsx
import { Employee } from '@/types/daftarKaryawan';
import React from 'react';
import { Controller, FieldValues, Control } from 'react-hook-form';

interface DocumentUploadProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  employeeData: Employee; // Replace with the correct type for your employee data
  setError: (name: string, error: { type: string; message: string }) => void;
  errors: Error; // Replace with the correct type for errors
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  name,
  label,
  control,
  employeeData,
  setError,
  errors,
}) => {
  return (
    <div className="space-y-2 w-auto">
      <p>{label}</p>
      <div className="w-fit">
        <Controller
          name={`document.${name}`}
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
                      {field.value.name.length <= 20
                        ? field.value.name
                        : field.value.name.slice(0, 20) + "..."}
                    </p>
                  </a>
                  <p
                    className="px-2 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blueBase text-gray-50 hover:bg-[#1648acc9] active:bg-blueBase"
                    onClick={() => field.onChange(null)} // Clears the file field
                  >
                    Ganti
                  </p>
                </>
              ) : (
                <>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_BACKEND}/images/${employeeData.document[name]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300"
                  >
                    {employeeData?.document[name] &&
                    typeof employeeData.document[name] === "string"
                      ? employeeData.document[name].length <= 20
                        ? employeeData.document[name]
                        : employeeData.document[name].slice(0, 20) + "..."
                      : null}
                  </a>
                  <label>
                    <span className="text-sm text-gray-50 rounded-lg cursor-pointer px-2 py-2 bg-blueBase dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                      Click to Upload File
                    </span>
                    <input
                      {...field}
                      type="file"
                      value={undefined}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            setError(`document.${name}`, {
                              type: "manual",
                              message: "File size should be less than 2MB",
                            });
                          } else {
                            field.onChange(file);
                          }
                        }
                      }}
                    />
                  </label>
                  <span className="text-sm text-blueBase rounded-lg border-2 border-gray-50 px-2 py-2 bg-[#EBF2FD] dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                    Image
                  </span>
                  <span className="text-sm text-blueBase rounded-lg border-2 border-gray-50 px-2 py-2 bg-[#FFFFFF] dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
                    {"<"} 2 MB
                  </span>
                </>
              )}
            </div>
          )}
        />
        {errors.document?.[name] && (
          <p className="text-red-500 text-sm">{errors.document?.[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
