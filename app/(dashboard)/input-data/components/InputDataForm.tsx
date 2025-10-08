'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, InputDataFormProps } from '../types/formTypes';

const InputDataForm: React.FC<InputDataFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    noSuratJalan: '',
    noSeal: '',
    nameDriver: '',
    nameRute: '',
    ruteType: '',
    jenisRitase: '',
    platNomor: '',
    keteranganPlat: '',
    jenisMobil: '',
    jenisTrip: '',
    waktuBerangkat: '',
    waktuTiba: '',
    rateSebelumTax: '',
    ppn: '',
    pph: '',
    totalSetelahTax: '',
    keterangan: '',
    noInvoice: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic here
  };

  // Fungsi untuk format currency (opsional)
  const formatCurrency = (value: string): string => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(Number(value));
  };

  return (
    <div className="">
      
      <form onSubmit={handleSubmit} className="form-container">
        {/* No. Surat Jalan di Sistem */}
        <div className="form-group">
          <label htmlFor="noSurat">No. Surat Jalan di Sistem</label>
          <input
            type="text"
            name="noSuratJalan"
            value={formData.noSuratJalan}
            onChange={handleChange}
            className="form-input"
            placeholder="Masukkan nomor surat jalan"
          />
        </div>

        
          <div className="form-group">
            <label htmlFor="noSeal">No. Seal</label>
            <input
              type="text"
              id="noSeal"
              name="noSeal"
              value={formData.noSeal}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameDriver">Nama Driver</label>
            <input
              type="text"
              id="nameDriver"
              name="nameDriver"
              value={formData.nameDriver}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameRute">Nama Rute</label>
            <select
              id="nameRute"
              name="nameRute"
              value={formData.nameRute}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Pilih Rute</option>
              <option value="rule1">Rute 1</option>
              <option value="rule2">Rute 2</option>
              <option value="rule3">Rute 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ruteType">Rute Utama / Rute Cabang</label>
            <select
              id="ruteType"
              name="ruteType"
              value={formData.ruteType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Pilih Jenis Rute</option>
              <option value="utama">Rute Utama</option>
              <option value="cabang">Rute Cabang</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jenisRitase">Jenis Ritase (Regular / Dorongan)</label>
            <select
              id="jenisRitaee"
              name="jenisRitaee"
              value={formData.jenisRitase}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Pilih Jenis Ritase</option>
              <option value="regular">Regular</option>
              <option value="dorongan">Dorongan</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="platNomor">Plat Nomor Kendaraan</label>
            <input
              type="text"
              id="platNomor"
              name="platNomor"
              value={formData.platNomor}
              onChange={handleChange}
              placeholder="Contoh: B 1234 CD"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="keteranganPlat">Keterangan Plat Nomor</label>
            <input
              type="text"
              id="keteranganPlat"
              name="keteranganPlat"
              value={formData.keteranganPlat}
              onChange={handleChange}
              placeholder="Contoh: Kuning, Hitam"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jenisMobil">Jenis Mobil</label>
            <input
              type="text"
              id="jenisMobil"
              name="jenisMobil"
              value={formData.jenisMobil}
              onChange={handleChange}
              placeholder="Contoh: CDDL"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jenisTrip">Jenis Trip</label>
            <select
              id="jenisTrip"
              name="jenisTrip"
              value={formData.jenisTrip}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Pilih Jenis Trip</option>
              <option value="sekali_jalan">Sepihak</option>
              <option value="pulang_pergi">Dua Pihak</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="waktuBerangkat">Waktu Berangkat Mobil</label>
            <input
              type="datetime-local"
              id="waktuBerangkat"
              name="waktuBerangkat"
              value={formData.waktuBerangkat}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="waktuTiba">Waktu Tiba Mobil</label>
            <input
              type="datetime-local"
              id="waktuTiba"
              name="waktuTiba"
              value={formData.waktuTiba}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rateSebelumTax">Rate Sebelum Tax</label>
            <div className="input-with-currency">
              <span className="currency">Rp.</span>
              <input
                type="number"
                id="rateSebelumTax"
                name="rateSebelumTax"
                value={formData.rateSebelumTax}
                onChange={handleChange}
                placeholder="Contoh: 870000"
                className="form-input currency-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ppn">PPN 1,1%</label>
            <div className="input-with-currency">
              <span className="currency">Rp.</span>
              <input
                type="number"
                id="ppn"
                name="ppn"
                value={formData.ppn}
                onChange={handleChange}
                placeholder="Contoh: 870000"
                className="form-input currency-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pph">PPH 2%</label>
            <div className="input-with-currency">
              <span className="currency">Rp.</span>
              <input
                type="number"
                id="pph"
                name="pph"
                value={formData.pph}
                onChange={handleChange}
                placeholder="Contoh: 870000"
                className="form-input currency-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="totalSetelahTax">Total Setelah Tax</label>
            <div className="input-with-currency">
              <span className="currency">Rp.</span>
              <input
                type="number"
                id="totalSetelahTax"
                name="totalSetelahTax"
                value={formData.totalSetelahTax}
                onChange={handleChange}
                placeholder="Contoh: 870000"
                className="form-input currency-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="keterangan">Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              placeholder="Tambahkan keterangan..."
              className="form-textarea"
              rows={3}
            />
          </div>
        

          <div className="form-group">
            <label htmlFor="noInvoice">No Invoice</label>
            <input
              type="text"
              name="noInvoice"
              value={formData.noInvoice}
              onChange={handleChange}
              placeholder="Contoh: 6.2088, 106.8456"
              className="form-input"
            />
          </div>
        

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Simpan Data
          </button>
        </div>
      </form>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }

        .form-container {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .section {
          margin-bottom: 30px;
        }

        .section-label {
          font-weight: bold;
          color: #666;
          display: block;
          margin-bottom: 10px;
        }

        .section-title {
          color: #333;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
        }

        .input-with-currency {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency {
          position: absolute;
          left: 10px;
          color: #666;
          z-index: 1;
          font-weight: bold;
        }

        .currency-input {
          padding-left: 35px;
        }

        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 30px 0;
        }

        .form-actions {
          text-align: center;
          margin-top: 30px;
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .submit-button {
          background: #0070f3;
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-button:hover {
          background: #0051a8;
        }

        .reset-button {
          background: #6c757d;
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .reset-button:hover {
          background: #545b62;
        }

        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
          
          .form-container {
            padding: 20px;
          }

          .form-actions {
            flex-direction: column;
          }

          .submit-button, .reset-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default InputDataForm;