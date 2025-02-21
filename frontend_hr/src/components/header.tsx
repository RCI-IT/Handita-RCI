"use client";

import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo1 from "../../public/assets/logo-1.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Sembunyikan header di halaman login
  if (pathname === "/login" || pathname === "/signin") return null;
  return (
    <div className="absolute top-0 right-5 flex items-center justify-between pt-[2.5vh]">
      <div className="flex items-center space-x-4 ">
        <div className="p-3 rounded-xl z-50 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
          <IoIosNotificationsOutline className="text-2xl" />
        </div>
        <div className="p-3 rounded-xl z-50 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex items-center space-x-2 bg-white w-[184px] h-14 overflow-hidden">
          <div className="relative rounded-full w-8 h-8 bg-blue-500">
            <Image
              src={logo1}
              alt="Logo"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm">Nama Pengguna</p>
        </div>
      </div>
    </div>
  );
}
