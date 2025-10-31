'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Booking {
  id: number;
  datetime: string;
  userId: number;
  userName: string;
  notes: string;
  status?: string;
}

export default function DashboardPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role === 'psychologist') {
      fetch('/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Kunne ikke hente bookinger');
          return res.json();
        })
        .then(setBookings)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, token]);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Psykolog Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Administrer avtaler</h2>
      {!user ? (
        <p className="text-gray-500">Logg inn som psykolog for å se og administrere bookinger.</p>
      ) : loading ? (
        <p>Laster bookinger...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : user.role !== 'psychologist' ? (
        <p className="text-gray-500">Kun psykologer har tilgang til denne siden.</p>
      ) : (
        <div className="mb-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">Kommende bookinger</h3>
          {bookings.length === 0 ? (
            <p>Ingen kommende bookinger.</p>
          ) : (
            <ul className="divide-y">
              {bookings.map((b) => (
                <li key={b.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="font-medium">{b.userName}</span> –{' '}
                    <span>{new Date(b.datetime).toLocaleString('nb-NO')}</span>
                    {b.notes && <span className="ml-2 text-gray-500">({b.notes})</span>}
                  </div>
                  <div className="mt-2 md:mt-0 flex gap-2">
                    {/* Action buttons placeholder */}
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm" disabled>Godta</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm" disabled>Avslå</button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm" disabled>Fullfør</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="mb-6 p-4 bg-green-50 rounded">
        <h3 className="font-semibold mb-2">Sikker meldingstjeneste</h3>
        <p>Kommuniser trygt med klienter før og etter timer.</p>
        {/* Meldingsfunksjon kan implementeres her */}
      </div>
      <p className="text-gray-500">(Funksjonalitet for administrasjon og meldinger implementeres i backend og kobles til her.)</p>
    </main>
  );
}