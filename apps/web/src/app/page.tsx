'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Finances Tracker</h1>
      <p className="text-center mb-4">
        A modern personal finance tracking application
      </p>
      <div className="flex gap-4">
        <a 
          href="/login" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </a>
        <a 
          href="/register" 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sign Up
        </a>
      </div>
    </main>
  );
}
