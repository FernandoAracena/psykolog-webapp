'use client'

import content from '../content/text.json';

export default function HomePage() {
  const { hero, features } = content.homePage;

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl mb-8">{hero.subtitle}</p>
          <a href="https://www.ledigpsykolog.no/miriam-heen-skotland/" target="_blank" rel="noopener noreferrer" className="bg-secondary text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-400">
            {hero.buttonText}
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{features.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.items.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}