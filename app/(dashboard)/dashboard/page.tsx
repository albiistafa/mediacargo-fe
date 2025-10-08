import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import DataTable from "./components/DataTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto w-full px-8 py-8 flex flex-col">
        <div>
          <div className="flex flex-col md:flex-row items-center mb-8">
            <h1 className="text-2xl md:text-6xl lg:text-9xl font-bold text-gray-900 mr-0 md:mr-8 mb-4 md:mb-0">
              Selamat datang, Berlian!
            </h1>
            <img src="/logo.png" alt="Logo Media Cargo" className="h-20 md:h-32 lg:h-40 w-auto" />
          </div>
          <p className="text-lg md:text-2xl text-gray-600 font-semibold mt-2 mb-8">
            Situs Tracking PT.Media Realindo Express
          </p>
        </div>
        <div className="mt-auto">
          <DataTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}