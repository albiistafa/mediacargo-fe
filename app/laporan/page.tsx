import Navbar from "../components/navbar";
import Footer from "../components/footer";

const laporanData = [
  {
    month: "November 2025",
    weeks: [
      { label: "27 Oktober - 2 November 2025" },
      { label: "3 - 9 November 2025" },
      { label: "10 - 16 November 2025" },
      { label: "17 - 23 November 2025" },
      { label: "24 - 30 November 2025" },
    ],
  },
  {
    month: "Oktober 2025",
    weeks: [
      { label: "29 September - 5 Oktober 2025" },
      { label: "6 - 12 Oktober 2025" },
      { label: "13 - 19 Oktober 2025" },
      { label: "20 - 26 Oktober 2025" },
    ],
  },
  {
    month: "September 2025",
    weeks: [
      { label: "1 - 7 September 2025" },
      { label: "8 - 14 September 2025" },
      { label: "15 - 21 September 2025" },
      { label: "22 - 28 September 2025" },
    ],
  },
  {
    month: "Agustus 2025",
    weeks: [
      { label: "4 - 10 Agustus 2025" },
      { label: "11 - 17 Agustus 2025" },
      { label: "18 - 24 Agustus 2025" },
      { label: "25 - 31 Agustus 2025" },
    ],
  },
];

const TruckIcon = () => (
  <svg
    className="w-6 h-6 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="19.5" r="2.5" />
    <circle cx="18.5" cy="19.5" r="2.5" />
  </svg>
);

const WeekCard = ({ label }: { label: string }) => (
  <div className="border rounded-md p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded">
        <TruckIcon />
      </div>
      <div className="ml-auto text-blue-600 text-sm font-medium hover:underline">
        Lihat &gt;&gt;
      </div>
    </div>
    <div className="text-gray-500 text-sm">Laporan Mingguan</div>
    <div className="font-bold text-gray-900">{label}</div>
  </div>
);

const MonthReport = ({ month, weeks }: { month: string; weeks: { label: string }[] }) => (
  <section className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="font-semibold text-lg text-gray-900">
          Laporan Bulan {month}
        </h2>
        <p className="text-sm text-gray-500">
          Overview aktivitas kurir dan pengiriman
        </p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Export Data
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {weeks.map((week, i) => (
        <WeekCard key={i} label={week.label} />
      ))}
    </div>
  </section>
);

const Laporan = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-10 py-8">
        {laporanData.map(({ month, weeks }) => (
          <MonthReport key={month} month={month} weeks={weeks} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Laporan;