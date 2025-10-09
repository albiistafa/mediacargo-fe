'use client';

import { useEffect } from 'react';
import { useInputData } from '@/app/(dashboard)/input-data/useInputData';
import { fetchRuteList } from '@/services/rute.services';
import { RuteOption } from '../types/formTypes'; // sesuaikan path


const InputDataForm: React.FC = () => {
  const {
    formData,
    setRuteOptions,
    ruteOptions,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
    handleReset,
  } = useInputData();

  useEffect(() => {
  const loadRute = async () => {
    try {
      const res = await fetchRuteList();
      if (res.success && res.data) {
        // konversi id number → string
        const converted: RuteOption[] = res.data.map(r => ({
          id: r.id.toString(),
          rute: r.rute,
        }));
        setRuteOptions(converted);
      }
    } catch (err) {
      console.error('Gagal memuat rute:', err);
    }
  };
  loadRute();
}, [setRuteOptions]);


  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md">
      {/* ALERT */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-md">
          <strong>Berhasil!</strong> Data berhasil disimpan.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Grid untuk informasi dasar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* No Surat Jalan */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              No. Surat Jalan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noSuratJalan"
              value={formData.noSuratJalan}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Masukkan nomor surat jalan"
              required
            />
          </div>

          {/* No Seal */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              No. Seal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noSeal"
              value={formData.noSeal}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Nama Driver */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Nama Driver <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nameDriver"
              value={formData.nameDriver}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Pilihan Rute */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Rute <span className="text-red-500">*</span>
          </label>
          
          {formData.ruteList.map((r, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600 font-medium">Rute {index + 1}:</span>
                {formData.ruteList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.ruteList.filter((_, i) => i !== index);
                      // Update urutan
                      updated.forEach((rute, i) => {
                        rute.urutan = i + 1;
                      });
                      handleChange({ target: { name: "ruteList", value: updated } });
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Hapus
                  </button>
                )}
              </div>
              
              {/* Dropdown dan Input Manual - Layout Responsif */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {/* Dropdown */}
                <div className="flex-1">
                  <select
                    value="" // Selalu kosong untuk placeholder
                    onChange={(e) => {
                      const selectedRuteId = e.target.value;
                      if (selectedRuteId) {
                        // Cari nama rute berdasarkan ID
                        const selectedRute = ruteOptions?.find(rute => rute.id === selectedRuteId);
                        const ruteName = selectedRute ? selectedRute.rute : "";
                        
                        const updated = [...formData.ruteList];
                        updated[index].rute_id = ruteName; // Simpan nama rute, bukan ID
                        updated[index].urutan = index + 1;

                        // jika pilih dropdown terakhir, tambahkan baris baru
                        if (index === formData.ruteList.length - 1) {
                          updated.push({ rute_id: "", urutan: index + 2 });
                        }

                        handleChange({ target: { name: "ruteList", value: updated } });
                      }
                    }}
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                  >
                    <option value="">Pilih Rute ke-{index + 1}</option>
                    {ruteOptions?.map((rute) => (
                      <option key={rute.id} value={rute.id}>
                        {rute.rute}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Input Manual */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Atau ketik manual jika tidak ada pilihan"
                    value={r.rute_id || ""}
                    onChange={(e) => {
                      const updated = [...formData.ruteList];
                      updated[index].rute_id = e.target.value || "";
                      updated[index].urutan = index + 1;

                      // jika input manual di baris terakhir, tambahkan baris baru
                      if (e.target.value && index === formData.ruteList.length - 1) {
                        updated.push({ rute_id: "", urutan: index + 2 });
                      }

                      handleChange({ target: { name: "ruteList", value: updated } });
                    }}
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {/* Tombol tambah rute */}
          <button
            type="button"
            onClick={() => {
              const updated = [...formData.ruteList];
              updated.push({ rute_id: "", urutan: formData.ruteList.length + 1 });
              handleChange({ target: { name: "ruteList", value: updated } });
            }}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            <span>+</span> Tambah Rute
          </button>
        </div>


        {/* Grid untuk jenis rute dan ritase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rute Type */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Rute Utama / Cabang <span className="text-red-500">*</span>
            </label>
            <select
              name="ruteType"
              value={formData.ruteType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">Pilih Jenis Rute</option>
              <option value="utama">Rute Utama</option>
              <option value="cabang">Rute Cabang</option>
            </select>
          </div>

          {/* Jenis Ritase */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Jenis Ritase <span className="text-red-500">*</span>
            </label>
            <select
              name="jenisRitase"
              value={formData.jenisRitase}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">Pilih Jenis Ritase</option>
              <option value="regular">Regular</option>
              <option value="dorongan">Dorongan</option>
            </select>
          </div>
        </div>

        {/* Grid untuk informasi kendaraan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Plat Nomor */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Plat Nomor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="platNomor"
              value={formData.platNomor}
              onChange={handleChange}
              placeholder="Contoh: B 1234 CD"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Keterangan Plat */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Keterangan Plat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="keteranganPlat"
              value={formData.keteranganPlat}
              onChange={handleChange}
              placeholder="Contoh: Kuning / Hitam"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Jenis Mobil */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Jenis Mobil <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="jenisMobil"
              value={formData.jenisMobil}
              onChange={handleChange}
              placeholder="Contoh: CDD / Tronton"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Jenis Trip */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Jenis Trip <span className="text-red-500">*</span>
            </label>
            <select
              name="jenisTrip"
              value={formData.jenisTrip}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            >
              <option value="">Pilih Jenis Trip</option>
              <option value="sekali_jalan">Sepihak</option>
              <option value="pulang_pergi">Dua Pihak</option>
            </select>
          </div>
        </div>

        {/* Grid untuk waktu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Waktu Berangkat */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Waktu Berangkat <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="waktuBerangkat"
              value={formData.waktuBerangkat}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>

          {/* Waktu Tiba */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Waktu Tiba <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="waktuTiba"
              value={formData.waktuTiba}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Grid untuk rate dan tax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rate Sebelum Tax */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Rate Sebelum Tax <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600 font-semibold">Rp</span>
              <input
                type="number"
                name="rateSebelumTax"
                value={formData.rateSebelumTax}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* PPN */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">PPN 1.1%</label>
            <input
              type="number"
              name="ppn"
              value={formData.ppn}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* PPH */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">PPH 2%</label>
            <input
              type="number"
              name="pph"
              value={formData.pph}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Total Setelah Tax */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Total Setelah Tax</label>
            <input
              type="number"
              name="totalSetelahTax"
              value={formData.totalSetelahTax}
              readOnly
              className="w-full border bg-gray-100 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Grid untuk keterangan dan invoice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Keterangan */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Keterangan</label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* No Invoice */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              No Invoice <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noInvoice"
              value={formData.noInvoice}
              onChange={handleChange}
              placeholder="Contoh: INV-2025-001"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg disabled:bg-gray-400 transition-colors"
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg disabled:bg-blue-400 transition-colors"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputDataForm;
