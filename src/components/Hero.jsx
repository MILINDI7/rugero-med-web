import { useEffect, useState } from 'react';
import './Hero.css';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <img src={images[index]} alt="hero slide" className="hero-image" />
      <div className="hero-caption">
        <span className="hero-highlight">At <span className="hero-brand">RugeroMed</span>,</span>
        We understand the importance of reliable, efficient, and safe medical equipment,<br></br>
         and we strive to deliver the best solutions to our customers.
      </div>
    </div>
  );
};

export default Hero;
