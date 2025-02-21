'use client'
// import { useState, useEffect } from 'react'
// import axios from "axios";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // Otomatis redirect ke halaman login
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