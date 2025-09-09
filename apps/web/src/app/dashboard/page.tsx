'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      router.push('/login');
      return;
    }
    
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error('Failed to parse user data:', err);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome back, {user.name}!</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Name:</span> {user.name} {user.surname}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Finances</h2>
        <p className="text-gray-600">
          This is where your financial data will appear. The app is currently in development.
        </p>
      </div>
    </div>
  );
}
