"use client";
// import { useState, useEffect } from 'react'
// import axios from "axios";

import { redirect } from "next/navigation";
import ClientWrap from "./clientwrapper";

export default function Home() {
  // redirect("/login"); // Otomatis redirect ke halaman login
  return (
    <>
      <ClientWrap />
      {/* <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">...konten kamu...</p>
      </div> */}
    </>
  );
}

// export async function getServerSideProps(context:any) {
//   let res = await fetch("https://api.rekaciptainovasi.net", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let allPosts = await res.json();

//   return {
//     props: { allPosts },
//   };
// }
