'use client'

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import content from '../../content/text.json';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 59.9437, // Approximate latitude for Gjerdrums vei 19, Oslo
  lng: 10.7220  // Approximate longitude for Gjerdrums vei 19, Oslo
};

export default function Contact() {
  const { title, contactInfo, form, map } = content.contactPage;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: string; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Noe gikk galt ved sending av melding.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Nettverksfeil eller serverproblem.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary text-center mb-12">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-dark mb-4">{contactInfo.title}</h2>
            <p className="text-lg mb-2">E-post: <a href={`mailto:${contactInfo.email}`} className="text-secondary hover:underline">{contactInfo.email}</a></p>
            <p className="text-lg mb-2">Telefon: <a href={`tel:${contactInfo.phone}`} className="text-secondary hover:underline">{contactInfo.phone}</a></p>
            <p className="text-lg mb-4">Adresse: <strong>{contactInfo.address}</strong></p>
            <p className="text-lg mb-8">Språk: {contactInfo.languages}</p>
            
            {/* El formulario de contacto está oculto temporalmente.
                Para volver a mostrarlo, elimina los símbolos de comentario de esta sección.
                            <h3 className="text-2xl font-bold text-dark mb-4 mt-8">{form.title}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg mb-2">{form.nameLabel}</label>
                <input type="text" id="name" className="w-full p-3 rounded-lg border border-gray-300" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg mb-2">{form.emailLabel}</label>
                <input type="email" id="email" className="w-full p-3 rounded-lg border border-gray-300" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-lg mb-2">{form.messageLabel}</label>
                <textarea id="message" rows={4} className="w-full p-3 rounded-lg border border-gray-300" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
              </div>
              {status && (
                <div className={`mb-4 text-center p-3 rounded-lg ${status.type === 'success' ? 'bg-success text-white' : 'bg-accent text-white'}`}>
                  {status.message}
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? form.submittingButton : form.submitButton}
              </button>
            </form>
            */}
          </div>
          <div>
            <div className="w-full h-96 rounded-lg shadow-md overflow-hidden">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">{map.loading}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}