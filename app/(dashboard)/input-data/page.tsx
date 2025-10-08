import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { NextPage } from 'next';
import Head from 'next/head';
import InputDataForm from './components/InputDataForm';

const InputData: NextPage = () => {
    return(
        <>
            <Head>
                <title>Input Data - PT. Media Realindo Express</title>
                <meta name="description" content="Input data sistem pengiriman" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <main className="flex-1 p-6">
                    <div className="flex flex-col min-h-screen">
                        <h1 className="text-2xl font-bold mb-4">Input Data</h1>
                        <p className="text-gray-600 mb-8">Input data pengiriman anda.</p>
                        <InputDataForm/>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default InputData;