import { FC, FormEvent, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  selectedDate: Date;
  userId?: string;
}

export const BookingForm: FC<BookingFormProps> = ({ selectedDate, userId }) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    if (!userId) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          userId,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      setSuccessMessage('Booking bekreftet!');
      setNotes(''); // Clear notes after successful booking
    } catch (error) {
      setError('Noe gikk galt med bookingen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Bekreft booking</h2>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2 text-dark">Dato</label>
        <div className="p-3 bg-light rounded-lg text-dark">
          {selectedDate.toLocaleDateString('nb-NO')}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block text-lg font-semibold mb-2 text-dark">Notater</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          rows={4}
        ></textarea>
      </div>

      {error && <p className="text-accent mb-4">{error}</p>}
      {successMessage && <p className="text-success mb-4">{successMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-secondary text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sender...' : 'Bekreft booking'}
      </button>
      {!userId && (
        <p className="text-sm text-gray-600 mt-4 text-center">Du må logge inn eller registrere deg for å bekrefte bookingen.</p>
      )}
    </form>
  );
};