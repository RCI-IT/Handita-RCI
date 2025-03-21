
"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";

const api = "http://192.168.110.253:4000/v1/";

// const Fetcher = async (url: string) => {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     throw new Error("Error fetching data");
//   }
// };

const handleDelete = async (id: string, url: string, linked: string) => {
  try {
    // Make the delete request to your API
    await axios.delete(`${url}${id}`);

    // Invalidate and re-fetch the data for the employees list
    await mutate(`${url}`);
  } catch (error) {
    console.error("Error deleting data:", error);
    // Handle error if needed
  }
};

const postFormData = async (url: string, data: Record<string, string | File | Blob | null | undefined>) => {
  try {
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
          // Ensure to cast nestedValue to string before appending
          formData.append(`${key}.${nestedKey}`, String(nestedValue));
        }
      } else {
        // Ensure to cast value to string before appending
        formData.append(key, String(value));
      }
    }
    console.log(formData);
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(url);

    return response.status;
  } catch (error) {
    throw new Error("Error posting data");
  }
};

const postJson = async (url: string, data: Record<string, string | null>) => {
  // Iterate through the properties of the data object
  for (const key in data) {
    // Check if the value is null or an empty string
    if (data[key] === null || data[key] === "") {
      // Delete the property from the data object
      delete data[key];
    }
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(data),
    });

    mutate(url);
    return response.status;
  } catch (error) {
    throw new Error("Error posting data");
  }
};

const editFormData = async (url: string, data: Record<string, string | null>) => {
  try {
    const formData = data instanceof FormData ? data : new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key.includes("price") && typeof value === "string") {
        const harga = parseFloat(value.replace(/[^0-9]/g, ""));
        // Append the "harga" field to FormData
        formData.append(key, String(harga));
      } else if (typeof value === "boolean") {
        // Handle boolean values according to your requirements
        // For example, you might want to convert them to a string representation
        formData.append(key, String(value));
      } else if (value instanceof File) {
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
          // Ensure to cast nestedValue to string before appending
          formData.append(`${key}.${nestedKey}`, String(nestedValue));
        }
      } else {
        // Ensure to cast value to string before appending
        formData.append(key, String(value));
      }
    }

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    mutate(url);

    return response.status;
  } catch (error) {
    throw new Error("Error editing data");
  }
};

const handleOpenTab = (fileName: string) => {
  const url = `${fileName}`;
  window.open(url, "_blank");
};

export {
  Fetcher,
  handleDelete,
  postFormData,
  postJson,
  editFormData,
  handleOpenTab,
};
