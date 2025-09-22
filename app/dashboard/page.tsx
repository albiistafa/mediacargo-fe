import Navbar from "../components/navbar";
import Footer from "../components/footer";
import DataTable from "../components/DataTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 mx-auto w-full px-8 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-9xl font-bold text-gray-900 mr-8">Selamat datang, Berlian!</h1>
          <img src="/logo.png" alt="Logo Media Cargo" className="h-100 w-auto" />
        </div>
        <p className="text-2xl text-gray-600 font-semibold mt-2">Situs Tracking PT.Media Realindo Express</p>
        <DataTable />
      </main>
      <Footer />
    </div>
  );
}