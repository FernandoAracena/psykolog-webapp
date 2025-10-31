import Image from 'next/image';
import content from '../../content/text.json';
import styles from './About.module.css';

export default function About() {
  const { title, description, methodology, experience, contact, image } = content.aboutPage;

  // Dividir la descripción para la vista móvil
  const sentences = description.split('. ');
  const midpoint = Math.ceil(sentences.length / 2);
  const descriptionPart1 = sentences.slice(0, midpoint).join('. ') + '.';
  const descriptionPart2 = sentences.slice(midpoint).join('. ');

  return (
    <div className={styles.aboutContainer}>
      {/* Componente de Imagen de Next.js para el fondo */}
      <Image
        src="/images/about-background.jpg"
        alt="Fondo de la página sobre nosotros"
        layout="fill"
        objectFit="cover"
        quality={75}
        className={styles.backgroundImage}
      />
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${styles.contentPanel}`}>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            
            {/* Vista móvil: texto dividido con imagen en medio */}
            <div className="md:hidden">
              <p className="text-lg mb-4">{descriptionPart1}</p>
              <div className="relative w-full h-full min-h-[300px] my-6">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-md"
                  quality={80}
                />
              </div>
              <p className="text-lg mb-4">{descriptionPart2}</p>
            </div>

            {/* Vista de escritorio: texto completo */}
            <p className="text-lg mb-4 hidden md:block">{description}</p>
            <p className="text-lg mt-6 font-semibold">{contact}</p>
          </div>
          <div className="hidden md:block">
            <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-md"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}