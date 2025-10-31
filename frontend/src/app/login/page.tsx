"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Feil e-post eller passord');
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, redirect
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Logg inn</h1>
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">E-post</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">Passord</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logger inn...' : 'Logg inn'}
        </button>
      </form>
    </main>
  );
}