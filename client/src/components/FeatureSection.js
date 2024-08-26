import React from 'react';
import './featuresection.css';

const features = [
  {
    id: 1,
    image: 'https://m.media-amazon.com/images/I/61o5R974YDL._AC_SL1500_.jpg', // Replace with your actual image paths
    title: 'Powerful Laptops',
    description: 'Discover the latest high-performance laptops designed for both work and play.',
  },
  {
    id: 2,
    image: 'https://m.media-amazon.com/images/I/51PpavHStIL._SS400_.jpg', // Replace with your actual image paths
    title: 'Innovative Smartphones',
    description: 'Explore cutting-edge smartphones with advanced features and sleek designs.',
  },
  {
    id: 3,
    image: 'https://m.media-amazon.com/images/I/71F-Wcriq4L._AC_SL1500_.jpg', // Replace with your actual image paths
    title: 'Gaming Laptops',
    description: 'Experience the ultimate gaming performance with top-tier gaming laptops.',
  },

];

export default function FeaturesSection() {
  return (
    <section className="features-section">

	  <h2>Our Services</h2>
 
      {features.map((feature, index) => (
        <div className={`feature-item ${index % 2 === 0 ? 'left' : 'right'}`} key={feature.id}>
          <div className="feature-image">
            <img src={feature.image} alt={feature.title} />
          </div>
          <div className="feature-description">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};


