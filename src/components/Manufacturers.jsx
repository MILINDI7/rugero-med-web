import './Manufacturers.css'; // 👈 Add this line

const logos = [
  `${process.env.PUBLIC_URL}/images/emtel-1.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-2.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-3.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-4.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-5.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-6.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-7.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-8.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-9.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-10.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-11.jpg`,
  `${process.env.PUBLIC_URL}/images/emtel-12.jpg`
];

const Manufacturers = () => (
  <section className="manufacturers-section">
    <h2 className="manufacturers-title">Our Manufacturers</h2>
    <div className="logo-slider">
      <div className="logo-track">
        {logos.map((src, i) => (
          <img key={i} src={src} alt={`Manufacturer ${i + 1}`} className="logo-image" />
        ))}
        {/* Duplicate logos for seamless infinite scroll */}
        {logos.map((src, i) => (
          <img key={`dup-${i}`} src={src} alt={`Duplicate Manufacturer ${i + 1}`} className="logo-image" />
        ))}
      </div>
    </div>
  </section>
);

export default Manufacturers;
