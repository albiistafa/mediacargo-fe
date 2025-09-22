import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Laporan = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Laporan</h1>
        <p>Selamat datang di Media Cargo Admin Dashboard.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Laporan;
