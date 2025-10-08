'use client';
import { useState } from 'react';

const DataTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 min-h-[50vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Data Pengiriman</h2>
        <div className="flex gap-2 md:gap-4">
          <button className="flex items-center px-3 py-2 border rounded hover:bg-gray-50 text-sm">
            <span className="mr-2">⬇️</span> Export
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            <span className="mr-2">+</span> Tambah Data
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Cari..."
            className="pl-10 pr-4 py-2 border rounded w-full text-sm"
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-50 text-sm">
            Filter Tanggal
          </button>
          <select
            className="px-4 py-2 border rounded text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Selesai</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">No.</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Agent Kepemilikan</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Carrier Company</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">No. Surat Jalan</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">No. Seal</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Nama Driver</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Nama Rute</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">RUTE/CABANG</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Jenis</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Plat Nomor</th>
              <th className="px-2 md:px-4 py-2 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="border-b hover:bg-gray-50">
                <td className="px-2 md:px-4 py-2">{row}</td>
                <td className="px-2 md:px-4 py-2">AG19</td>
                <td className="px-2 md:px-4 py-2">PT.MEDIA REALINDO EXPRESS</td>
                <td className="px-2 md:px-4 py-2">ZXZ825018200331</td>
                <td className="px-2 md:px-4 py-2">Y14265102</td>
                <td className="px-2 md:px-4 py-2">Berlian Ishma</td>
                <td className="px-2 md:px-4 py-2">MDN-MJK05-MOJ02</td>
                <td className="px-2 md:px-4 py-2">RUTE/CABANG</td>
                <td className="px-2 md:px-4 py-2">REGULER</td>
                <td className="px-2 md:px-4 py-2">DK 1234 AB</td>
                <td className="px-2 md:px-4 py-2">KUNING</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-4">
        <p className="text-xs text-gray-600">Menampilkan 1-5 dari 24 data</p>
        <div className="flex gap-1 md:gap-2">
          <button className="px-3 py-1 border rounded text-xs">Sebelumnya</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">1</button>
          <button className="px-3 py-1 border rounded text-xs">2</button>
          <button className="px-3 py-1 border rounded text-xs">3</button>
          <button className="px-3 py-1 border rounded text-xs">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;