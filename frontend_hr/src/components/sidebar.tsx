"use client";
// import { LuChevronsLeftRight } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
import { IconType } from "react-icons";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import Link from "next/link";
import logo1 from "../../public/assets/logo-1.png";
import logo2 from "../../public/assets/logo-2.png";
import { usePathname } from "next/navigation";

interface Menu {
  name: string;
  menu: Array<LinkItemProps>;
}
interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<Menu> = [
  {
    name: "Umum",
    menu: [
      { name: "Beranda", icon: FiHome, path: "#" },
      { name: "Jadwal ", icon: FiCalendar, path: "#" },
    ],
  },
  {
    name: "Personalia",
    menu: [
      { name: "Karyawan", icon: FiUser, path: "/personalia/daftar-karyawan" },
    ],
  },
  {
    name: "Pembelian",
    menu: [
      {
        name: "Purchase Order ",
        icon: FiFileText,
        path: "/pembelian/purchase-order",
      },
    ],
  },
  {
    name: "Pengaturan",
    menu: [{ name: "Pengaturan", icon: FiSettings, path: "#" }],
  },
];

export default function Sidebar() {
  const [navSize, changeNavSize] = useState(false);
  const handleSide = () => {
    changeNavSize(!navSize);
  };

  const pathname = usePathname();

  // Sembunyikan sidebar di halaman login
  if (pathname === "/login" || pathname === "/signin") return null;

  return (
    <div className="relative flex">
      <aside
        className={`${`h-[96vh] fixed left-4 top-[2vh] rounded-xl z-50 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex transform ease-in-out duration-500 text-[#323232] bg-white dark:bg-[#1B2C3F]`} 
        ${navSize ? "w-20" : "w-52"}`}
      >
        {/*  open sidebar button */}
        <button
          onClick={handleSide}
          className="
            border-1 
            border-gray-200 
            bg-white
            border
            absolute 
            p-1
            top-[51px] 
            rounded-[8px] 
            -right-4 transition transform ease-linear duration-500"
        >
          {navSize ? <TbChevronsRight /> : <TbChevronsLeft />}
        </button>
        <div className="flex-col space-y-2 w-full h-full">
          <div
            className={`${`border-b-[1px] border-b-gray-200 w-full h-[66px]`}
          ${navSize ? "p-3" : "p-5"}`}
          >
            <div className=" relative w-full h-full ">
              <Image
                src={navSize ? logo1 : logo2}
                alt="Logo"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="">
            {LinkItems.map((link, index) => (
              <div
                key={index}
                className={`${`my-10 `}${navSize ? "px-0" : "px-5"}`}
              >
                <p
                  className={`${`font-light text-[10px] uppercase`}
              ${navSize ? "text-center " : "text-left"}`}
                >
                  {link.name}
                </p>
                {link.menu.map((menu, index) => (
                  <Link
                    href={menu.path}
                    key={index}
                    className="flex items-center my-2 w-full h-[24px] overflow-hidden"
                  >
                    <menu.icon
                      className={`${`text-2xl flex-nowrap text-[#18529E] `}${
                        navSize ? "mx-auto w-full " : "mr-3"
                      }`}
                    />
                    <span
                      className={`${`transform transition ease-linear duration-500 origin-[0] font-extralight `}${
                        navSize ? "scale-x-0 hidden" : "scale-x-100 text-sm"
                      }`}
                    >
                      {menu.name}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <button
            className={`${"rounded-b-xl flex border-t-[1px] border-t-gray-200 p-5 absolute bottom-0 w-full bg-[#f5f5f5] "}${
              navSize ? "place-content-center" : "place-content-start space-x-2"
            }`}
          >
            <RiLogoutBoxLine className="text-2xl text-[#18529E]" />
            <p className={navSize ? "hidden" : "block"}>Keluar</p>
          </button>
        </div>
      </aside>
      <div
        className={`${`transform ease-in-out duration-500 h-screen `}${
          navSize ? "ml-28" : "ml-60"
        }`}
      ></div>
    </div>
  );
}
