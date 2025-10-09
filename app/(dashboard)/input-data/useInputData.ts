'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, RuteItem, RuteOption } from './types/formTypes';
import { uploadLaporan, validateLaporanPayload, convertFormToPayload } from '@/services/laporan.services';

export function useInputData() {
  const [formData, setFormData] = useState<FormData>({
  noSuratJalan: "",
  noSeal: "",
  nameDriver: "",
  nameRute: "",
  ruteList: [{ rute_id: "", urutan: 1 }],
  ruteType: "",
  jenisRitase: "",
  platNomor: "",
  keteranganPlat: "",
  jenisMobil: "",
  jenisTrip: "",
  waktuBerangkat: "",
  waktuTiba: "",
  rateSebelumTax: "",
  ppn: "",
  pph: "",
  totalSetelahTax: "",
  keterangan: "",
  noInvoice: "",
});


  const [ruteOptions, setRuteOptions] = useState<RuteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ---- handle input changes ----
  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
): void => {
  const { name, value } = e.target;

  setFormData(prev => ({ ...prev, [name]: value }));

  if (['rateSebelumTax', 'ppn', 'pph'].includes(name)) {
    calculateTotalAfterTax({ ...formData, [name]: value });
  }
};


  const calculateTotalAfterTax = (data: FormData) => {
    const rateBeforeTax = parseFloat(data.rateSebelumTax) || 0;
    const ppn = parseFloat(data.ppn) || 0;
    const pph = parseFloat(data.pph) || 0;

    const ppnNominal = rateBeforeTax * (ppn / 100);
    const pphNominal = rateBeforeTax * (pph / 100);
    const total = rateBeforeTax + ppnNominal - pphNominal;

    setFormData(prev => ({
      ...prev,
      totalSetelahTax: total.toString(),
    }));
  };

  // ---- submit form ----
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = convertFormToPayload(formData, ruteOptions);
      const validationErrors = validateLaporanPayload(payload);

      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        setLoading(false);
        return;
      }

      const response = await uploadLaporan(payload);

      if (response.success) {
        setSuccess(true);
        handleReset();
        alert('Data berhasil disimpan!');
      } else {
        setError(response.message || 'Gagal menyimpan data');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  // ---- reset form ----
  const handleReset = () => {
  setFormData({
    noSuratJalan: '',
    noSeal: '',
    nameDriver: '',
    nameRute: '',
    ruteList: [{ rute_id: "", urutan: 1 }], // <-- kembalikan default
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
    noInvoice: '',
  });
  setRuteOptions([]); // tetap bisa kosongkan data rute global
  setError(null);
  setSuccess(false);
};


  return {
    formData,
    setFormData,
    ruteOptions,
    setRuteOptions,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
