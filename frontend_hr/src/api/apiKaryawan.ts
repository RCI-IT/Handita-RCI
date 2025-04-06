import useSWR, { mutate } from "swr";
import { Employee } from "@/types/daftarKaryawan";

// Interface untuk struktur error response
interface ErrorResponse {
  message: string;
}

// Fungsi fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Custom hook untuk mengambil data karyawan
export const useKaryawanData = () => {
  const { data, error } = useSWR<Employee[] | ErrorResponse>(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees`,
    fetcher
  );
  const isNotFound =
    data && (data as ErrorResponse).message?.includes("not found");

  return {
    data: data || [],
    error,
    isLoading: !data && !error,
    isNotFound,
  };
};

export const useKaryawanDataDetail = (id: string) => {
  const { data, error } = useSWR<Employee | ErrorResponse>(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/${id}`,
    fetcher
  );

  const isNotFound =
    data && (data as ErrorResponse).message?.includes("not found"); // Memeriksa pesan error

  return {
    data: data || null,
    error,
    isLoading: !data && !error,
    isNotFound,
  };
};

export const postKaryawanWithFile = async (data: Employee) => {
  // Check if 'data' is already a FormData object
  const formData = data instanceof FormData ? data : new FormData();

  // Iterate over properties of data object
  for (const [key, value] of Object.entries(data)) {
    // Check if the value is undefined or null
    if (value === undefined || value === null) {
      // Skip processing this key-value pair
      continue;
    }
    // Check if the key is "price" and the value is a string
    else if (key === "price" && typeof value === "string") {
      // Convert the "price" value to a number and replace non-numeric characters
      const harga = parseFloat(value.replace(/[^0-9]/g, ""));
      // Append the "harga" field to FormData
      formData.append(key, String(harga));
    }
    // Check if the value is a File
    else if (value instanceof File) {
      // Append a timestamp to the original file name to make it unique
      const uniqueFileName = `${key}_${value.name}`;
      formData.append(key, value, uniqueFileName);
    } else if (
      value &&
      typeof value === "object" &&
      value.constructor === Object
    ) {
      // If the value is an object, assume it is a nested object and iterate over its properties
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (nestedValue instanceof File) {
          // const uniqueNestedFileName = `${key}.${nestedKey}_${Date.now()}_${
          //   nestedValue.name
          // }`;
          formData.append(`${nestedKey}`, nestedValue, nestedValue.name);
        } else {
          // If it's not a file, append as a string
          formData.append(`${nestedKey}`, String(nestedValue));
        }
      }
    } else {
      // Ensure to cast value to string before appending
      formData.append(key, String(value));
    }
  }

  console.log(formData);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        //   // Add any additional headers if needed
        // },
        body: formData,
      }
    );

    mutate(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/`);
    console.log("Data berhasil ditambah");
    return response.status;
  } catch (error) {
    console.error("Error posting data:", error); // Log the error for debugging
    throw new Error("Error posting data");
  }
};

export const editDataWithFile = async (data: Employee, id: string) => {
  const formData = data instanceof FormData ? data : new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      continue;
    } else if (key === "price" && typeof value === "string") {
      const harga = parseFloat(value.replace(/[^0-9]/g, ""));
      formData.append(key, String(harga));
    } else if (value instanceof File) {
      const uniqueFileName = `${key}_${value.name}`;
      formData.append(key, value, uniqueFileName);
    } else if (
      value &&
      typeof value === "object" &&
      value.constructor === Object
    ) {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (nestedValue === undefined || nestedValue === null) {
          continue;
        } else if (nestedValue instanceof File) {
          formData.append(`${nestedKey}`, nestedValue, nestedValue.name);
        } else {
          formData.append(`${nestedKey}`, String(nestedValue));
        }
      }
    } else {
      formData.append(key, String(value));
    }
  }

  console.log(formData);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    mutate(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/`);
    console.log("Data berhasil diperbaharui");
    return response;
  } catch (error) {
    console.error("Error posting data:", error); // Log the error for debugging
    throw new Error("Error posting data");
  }
};

export const deleteData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Gagal menghapus karyawan");
  }
  return response.json();
};
