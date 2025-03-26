// DocumentCard.tsx

import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface Document {
  idCard?: string | File | null;
  npwp?: string | File | null;
  kartuKeluarga?: string | File | null;
  ijazah?: string | File | null;
}

interface DocumentCardProps {
  documentType: string;
  fieldName: keyof Document; // This ensures the field name is from the `Document` object
  control: Control;
  errors: FieldErrors;
  employeeData: { document: Document; image: string }; // More specific type
  setError: (name: string, error: { type: string, message: string }) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  documentType,
  fieldName,
  control,
  errors,
  employeeData,
  setError,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
      <p className="font-semibold text-lg">{documentType}</p>
      <div className="w-full">
        <Controller
          name={`document.${fieldName}`}
          control={control}
          rules={{ required: "*Kolom ini wajib diisi" }}
          render={({ field }) => (
            <div className="flex flex-col items-start space-y-4">
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
                    className="px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-400 ease-in-out bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-600"
                    onClick={() => field.onChange(null)} // Clears the file field
                  >
                    Ganti
                  </p>
                </>
              ) : (
                <>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_BACKEND}/images/${employeeData.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300"
                  >
                    {employeeData?.document[fieldName] &&
                    typeof employeeData.document[fieldName] === "string"
                      ? employeeData.document[fieldName].length <= 20
                        ? employeeData.document[fieldName]
                        : employeeData.document[fieldName].slice(0, 20) + "..."
                      : null}
                  </a>
                  <label>
                    <span className="text-sm text-white rounded-lg cursor-pointer px-4 py-2 bg-blue-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 font-medium">
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
                            setError(`document.${fieldName}`, {
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
                </>
              )}
            </div>
          )}
        />
        {errors.document?.[fieldName] && (
          <p className="text-red-500 text-sm">{errors.document?.[fieldName].message}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
