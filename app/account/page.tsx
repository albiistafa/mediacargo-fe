"use client";

import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { User } from './types/userTypes';

const Akun: NextPage = () => {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [user, setUser] = useState<User>({
    name: 'Berlian',
    email: 'berlian@gmail.com',
    username: 'Berlian',
    role: 'berlian'
  });

  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log('Saving data:', formData);
    alert('Perubahan berhasil disimpan!');
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    alert('Anda telah logout!');
  };

  return (
    <>
      <Head>
        <title>Akun - MediaCargo</title>
        <meta name="description" content="Management Akun MediaCargo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 p-6">
              {/* Header */}
              <div className="">
                <h1 className="text-2xl font-bold mb-4">Pengaturan Akun</h1>
                <p className="text-gray-600 mb-8">Kelola informasi akun dan keamanan Anda</p>
              </div>

              {/* Account Information Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">💎</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Berlian</h2>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan email Anda"
                    />
                  </div>

                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan username Anda"
                    />
                  </div>

                  {/* Password Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ubah Password</h3>
                    
                    {/* Current Password */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Saat Ini
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan password saat ini"
                      />
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan password baru"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Konfirmasi password baru"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium"
                    >
                      Keluar
                    </button>
                    
                    <div className="space-x-4">
                      <button
                        type="button"
                        onClick={() => setFormData({
                          email: user.email,
                          username: user.username,
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        })}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
    </>
  );
};

export default Akun;