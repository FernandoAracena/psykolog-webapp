import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Contenedor del icono con el mismo estilo que el del encabezado
      // Icono simple con texto negro sobre un fondo transparente.
      <div style={{ fontSize: 24, background: 'transparent', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold' }}>
        MP      </div>
    ),
    { ...size }
  );
}
