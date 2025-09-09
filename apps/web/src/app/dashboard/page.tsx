'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900">Finance Tracker</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="inline-flex items-center border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium text-gray-900">
                  Dashboard
                </a>
                <a href="#" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Transactions
                </a>
                <a href="#" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Budgets
                </a>
                <a href="#" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Reports
                </a>
              </div>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div>
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-sm font-medium leading-none text-gray-700">{user.name.charAt(0)}{user.surname.charAt(0)}</span>
                    </span>
                  </button>
                </div>
                
                {isMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-semibold">{user.name} {user.surname}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center sm:hidden">
              <button 
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a href="#" className="block border-l-4 border-blue-500 bg-blue-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700">Dashboard</a>
              <a href="#" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800">Transactions</a>
              <a href="#" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800">Budgets</a>
              <a href="#" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800">Reports</a>
            </div>
            <div className="border-t border-gray-200 px-4 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-sm font-medium leading-none text-gray-700">{user.name.charAt(0)}{user.surname.charAt(0)}</span>
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name} {user.surname}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Settings</a>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Account balance card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Account Balance</h3>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-semibold text-gray-900">$12,580.00</p>
              <p className="mt-1 text-sm text-green-600">+$2,300.00 from last month</p>
            </div>
          </div>

          {/* Income card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Income</h3>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-semibold text-gray-900">$4,500.00</p>
              <p className="mt-1 text-sm text-green-600">+12% from last month</p>
            </div>
          </div>

          {/* Expenses card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Expenses</h3>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-semibold text-gray-900">$2,200.00</p>
              <p className="mt-1 text-sm text-red-600">-5% from last month</p>
            </div>
          </div>

          {/* Savings card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">Savings</h3>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-semibold text-gray-900">$8,000.00</p>
              <p className="mt-1 text-sm text-green-600">+10% from last month</p>
            </div>
          </div>
        </div>
        
        {/* Recent transactions */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</a>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Grocery Shopping</p>
                    <p className="text-xs text-gray-500">Sep 8, 2025</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-red-600">-$84.32</p>
              </li>
              <li className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Salary Deposit</p>
                    <p className="text-xs text-gray-500">Sep 5, 2025</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-green-600">+$2,250.00</p>
              </li>
              <li className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Restaurant Bill</p>
                    <p className="text-xs text-gray-500">Sep 3, 2025</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-red-600">-$56.89</p>
              </li>
              <li className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Monthly Rent</p>
                    <p className="text-xs text-gray-500">Sep 1, 2025</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-red-600">-$1,200.00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
