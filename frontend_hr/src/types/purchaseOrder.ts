
export type PurchaseOrder = {
  numberPO: number;
  proyek: string;
  tanggal: Date;
  status: "Sedang diproses" | "Selesai" | "Revisi";
};

export const purchaseData: PurchaseOrder[] = [
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 1234,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 15555,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 11111,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 15555,
    proyek: "Proyek Baru",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Selesai",
  },
  {
    numberPO: 11111,
    proyek: "Proyek Lama",
    tanggal: new Date('2022-10-31T09:00:00.594Z'),
    status: "Revisi",
  },
];