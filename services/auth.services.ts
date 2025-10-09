// services/auth.ts
import axiosInstance from "@/lib/axios";

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}


export interface RegisterResponse {
  success: boolean;
  message: string;
}

/**
 * Login user
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/admin/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message );
    } else if (error.request) {
      throw new Error('Tidak dapat terhubung ke server');
    } else {
      throw new Error(error.message || 'Terjadi kesalahan');
    }
  }
}

/**
 * Register user
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const response = await axiosInstance.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registrasi gagal');
    } else if (error.request) {
      throw new Error('Tidak dapat terhubung ke server');
    } else {
      throw new Error(error.message || 'Terjadi kesalahan');
    }
  }
}

/**
 * Get current user profile
 */
export async function getProfile() {
  try {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Gagal mengambil profile');
    }
    throw new Error('Terjadi kesalahan');
  }
}

/**
 * Update user profile
 */
export async function updateProfile(data: {
  email?: string;
  username?: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  try {
    const response = await axiosInstance.put('/auth/profile', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Gagal update profile');
    }
    throw new Error('Terjadi kesalahan');
  }
}