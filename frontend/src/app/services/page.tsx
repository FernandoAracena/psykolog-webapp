import content from '../../content/text.json';

export default function Services() {
  const { title, services, footer } = content.servicesPage;

  return (
    <div className="bg-light py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary text-center mb-12">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-dark mb-4">{service.title}</h2>
              <p className="text-lg">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-lg mb-4">{footer.text}</p>
          <a href="https://www.ledigpsykolog.no/miriam-heen-skotland/" target="_blank" rel="noopener noreferrer" className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400">
            {footer.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}