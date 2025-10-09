// services/rute.services.ts
import axiosInstance from "@/lib/axios";

export interface Rute {
  id: number;
  rute: string;
}

export interface RuteResponse {
  success: boolean;
  message: string;
  data?: Rute[];
  error?: any;
}

/**
 * Ambil semua rute dari API
 */
export async function fetchRuteList(): Promise<RuteResponse> {
  try {
    const { data } = await axiosInstance.get<RuteResponse>("/rute");
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengambil data rute",
      error: error.response?.data || error,
    };
  }
}
