export type TypeKaryawan = {
  foto: string;
  nama: string;
  idKaryawan: string;
  posisi: string;
};

export type Document = {
  id: string;
  employeeId: string;
  idCard: string;
  taxCard: string;
  familyCard: string;
  diploma: string;
  createdAt: string;
  updatedAt: string;
};

export type Employee = {
  id: string;
  employeeNumber: string;
  idCardNumber: string;
  image: string;
  fullName: string;
  birth: string;
  birthDate: string;
  gender: string;
  religion: string;
  address: string;
  email: string;
  phone: string;
  education: string;
  school: string;
  major: string;
  position: string;
  status: string;
  hireDate: string;
  createdAt: string;
  updatedAt: string;
  document: Document;
};

// export const karyawanData: TypeKaryawan[] = [
//   {
//     foto: "1.png",
//     nama: "Yudha Kurniawan",
//     idKaryawan: "1234",
//     posisi: "IT Staff",
//   },{
//     foto: "1.png",
//     nama: "Handita Mutia",
//     idKaryawan: "1234",
//     posisi: "IT Staff",
//   },{
//     foto: "1.png",
//     nama: "M. Imam Alamin",
//     idKaryawan: "1234",
//     posisi: "IT Staff",
//   },
// ];

export const karyawanData: Employee[] = [
  {
    id: "96493eac-63f4-432d-a19d-506f3042ae91",
    employeeNumber: "1123",
    idCardNumber: "1234567891234567",
    image: "untitled-1740966398895-404348056.PNG",
    fullName: "jdkjd",
    birth: "sdsds",
    birthDate: "2000-10-31T00:00:00.000Z",
    gender: "Perempuan",
    religion: "Islam",
    address: "sjkdjsk",
    email: "handita@gmail.com",
    phone: "089865645",
    education: "dhjldjjd",
    school: "sdjkdjdj",
    major: "sdhdkjdj",
    position: "hojksdhjkd",
    status: "njkxljkhojd",
    hireDate: "2000-10-10T00:00:00.000Z",
    createdAt: "2025-03-03T01:46:38.920Z",
    updatedAt: "2025-03-03T01:46:38.920Z",
    document: {
      id: "2d25b802-80bb-4547-a34e-db1d16e876a5",
      employeeId: "96493eac-63f4-432d-a19d-506f3042ae91",
      idCard: "untitled-1740966398902-956635412.PNG",
      taxCard: "untitled-1740966398896-329889859.PNG",
      familyCard: "images-1740966398896-242232925.jpg",
      diploma: "untitled-1740966398897-740396839.PNG",
      createdAt: "2025-03-03T01:46:38.920Z",
      updatedAt: "2025-03-03T01:46:38.920Z",
    },
  },
  {
    id: "b7b21892-2909-4b61-8d63-b2e6a7085a37",
    employeeNumber: "1124",
    idCardNumber: "9876543219876543",
    image: "image-example.PNG",
    fullName: "Ahmad Prasetyo",
    birth: "Jakarta",
    birthDate: "1995-07-22T00:00:00.000Z",
    gender: "Laki-laki",
    religion: "Kristen",
    address: "Jl. Merdeka No. 12, Jakarta",
    email: "ahmadp@gmail.com",
    phone: "082234567890",
    education: "S1 Teknik Informatika",
    school: "Universitas Jakarta",
    major: "Teknik Informatika",
    position: "Software Engineer",
    status: "Aktif",
    hireDate: "2021-01-10T00:00:00.000Z",
    createdAt: "2025-03-03T02:00:00.000Z",
    updatedAt: "2025-03-03T02:00:00.000Z",
    document: {
      id: "1d25b802-80bb-4547-a34e-db1d16e876a1",
      employeeId: "b7b21892-2909-4b61-8d63-b2e6a7085a37",
      idCard: "image-example-idcard.PNG",
      taxCard: "image-example-taxcard.PNG",
      familyCard: "image-example-familycard.jpg",
      diploma: "image-example-diploma.PNG",
      createdAt: "2025-03-03T02:00:00.000Z",
      updatedAt: "2025-03-03T02:00:00.000Z",
    },
  },
];

