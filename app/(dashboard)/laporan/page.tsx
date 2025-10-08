import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import MonthReport from "./components/MonthReport";

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
