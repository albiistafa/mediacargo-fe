import Navbar from '../components/navbar';
import Footer from '../components/footer';

const InputData = () => {
    return(
        <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Input Data</h1>
        <p>Input data anda.</p>
      </main>
      <Footer />
    </div>
    );
}

export default InputData;