'use client';
import { useState } from 'react';

const DataTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Pengiriman</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            <span className="mr-2">⬇️</span> Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <span className="mr-2">+</span> Tambah Data
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari..."
          className="px-4 py-2 border rounded w-64"
        />
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-50">
            Filter Tanggal
          </button>
          <select 
            className="px-4 py-2 border rounded"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Selesai</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Agent Kepemilikan</th>
              <th className="px-4 py-2">Carrier Company</th>
              <th className="px-4 py-2">No. Surat Jalan</th>
              <th className="px-4 py-2">No. Seal</th>
              <th className="px-4 py-2">Nama Driver</th>
              <th className="px-4 py-2">Nama Rute</th>
              <th className="px-4 py-2">RUTE/CABANG</th>
              <th className="px-4 py-2">Jenis</th>
              <th className="px-4 py-2">Plat Nomor</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((row) => (
              <tr key={row} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row}</td>
                <td className="px-4 py-2">AG19</td>
                <td className="px-4 py-2">PT.MEDIA REALINDO EXPRESS</td>
                <td className="px-4 py-2">ZXZ825018200331</td>
                <td className="px-4 py-2">Y14265102</td>
                <td className="px-4 py-2">Berlian Ishma</td>
                <td className="px-4 py-2">MDN-MJK05-MOJ02</td>
                <td className="px-4 py-2">RUTE CABANG</td>
                <td className="px-4 py-2">REGULER</td>
                <td className="px-4 py-2">DK 1234 AB</td>
                <td className="px-4 py-2">KUNING</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Menampilkan 1-3 dari 24 data</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Sebelumnya</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;