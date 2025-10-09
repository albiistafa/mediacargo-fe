// services/laporan.ts
import axiosInstance from "@/lib/axios";

// Type definitions
export interface RuteItem {
  rute_id: string;
  urutan: number;
}

export interface LaporanPayload {
  ritase: string;
  trip: string;
  rute: string;
  driver: string;
  surat_jalan: string;
  no_seal: string;
  no_plat: string;
  ket_plat: string;
  mobil: string;
  keberangkatan: string; 
  kedatangan: string; 
  rate_before_tax: number;
  ppn_rate: number;
  pph_rate: number;
  rate_after_tax: number;
  keterangan: string;
  no_invoice: string;
  ruteList: RuteItem[];
}

export interface LaporanResponse {
  success: boolean;
  message: string;
  error?: any;
  data?: any;
}

/**
 * Upload laporan pengiriman
 */
export async function uploadLaporan(payload: LaporanPayload): Promise<LaporanResponse> {
  try {
    const { data } = await axiosInstance.post<LaporanResponse>("/laporan", payload);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal mengupload laporan");
    }
    throw new Error("Terjadi kesalahan jaringan");
  }
}

/**
 * Validasi payload sebelum dikirim
 */
export function validateLaporanPayload(payload: Partial<LaporanPayload>): string[] {
  const errors: string[] = [];

  if (!payload.ritase) errors.push("Jenis Ritase harus diisi");
  if (!payload.trip) errors.push("Jenis Trip harus diisi");
  if (!payload.rute) errors.push("Rute harus diisi");
  if (!payload.driver) errors.push("Nama Driver harus diisi");
  if (!payload.surat_jalan) errors.push("No. Surat Jalan harus diisi");
  if (!payload.no_seal) errors.push("No. Seal harus diisi");
  if (!payload.no_plat) errors.push("Plat Nomor harus diisi");
  if (!payload.ket_plat) errors.push("Keterangan Plat harus diisi");
  if (!payload.mobil) errors.push("Jenis Mobil harus diisi");
  if (!payload.keberangkatan) errors.push("Waktu Keberangkatan harus diisi");
  if (!payload.kedatangan) errors.push("Waktu Kedatangan harus diisi");
  if (!payload.rate_before_tax) errors.push("Rate Sebelum Tax harus diisi");
  if (!payload.no_invoice) errors.push("No. Invoice harus diisi");
  
  if (!payload.ruteList || payload.ruteList.length === 0) {
    errors.push("Rute harus diisi minimal 1 rute");
  } else {
    // Validasi setiap rute
    payload.ruteList.forEach((rute, index) => {
      if (!rute.rute_id || rute.rute_id.trim() === "") {
        errors.push(`Rute ke-${index + 1} harus diisi`);
      }
      if (!rute.urutan || rute.urutan <= 0) {
        errors.push(`Urutan rute ke-${index + 1} tidak valid`);
      }
    });
  }

  return errors;
}

/**
 * Convert nama rute ke ID berdasarkan rute options
 */
function convertRuteNameToId(ruteName: string, ruteOptions: any[]): string {
  const foundRute = ruteOptions?.find(rute => rute.rute === ruteName);
  return foundRute ? foundRute.id : ruteName; // Jika tidak ditemukan, return nama asli
}

/**
 * Convert form data ke format payload API
 */
export function convertFormToPayload(formData: any, ruteOptions?: any[]): LaporanPayload {
  return {
    ritase: formData.jenisRitase || "",
    trip: formData.jenisTrip || "",
    rute: formData.ruteType || "",
    driver: formData.nameDriver || "",
    surat_jalan: formData.noSuratJalan || "",
    no_seal: formData.noSeal || "",
    no_plat: formData.platNomor || "",
    ket_plat: formData.keteranganPlat || "",
    mobil: formData.jenisMobil || "",
    keberangkatan: formData.waktuBerangkat
      ? new Date(formData.waktuBerangkat).toISOString()
      : "",
    kedatangan: formData.waktuTiba
      ? new Date(formData.waktuTiba).toISOString()
      : "",
    rate_before_tax: parseFloat(formData.rateSebelumTax) || 0,
    ppn_rate: parseFloat(formData.ppn) || 0,
    pph_rate: parseFloat(formData.pph) || 0,
    rate_after_tax: parseFloat(formData.totalSetelahTax) || 0,
    keterangan: formData.keterangan || "",
    no_invoice: formData.noInvoice || "",
    ruteList: (formData.ruteList || [])
      .filter(rute => rute.rute_id && rute.rute_id.trim() !== "")
      .map(rute => ({
        rute_id: ruteOptions ? convertRuteNameToId(rute.rute_id, ruteOptions) : rute.rute_id,
        urutan: rute.urutan
      })),
  };
}