const logos = [
    "/images/logo1.png",
    "/images/logo2.png",
    "/images/logo3.png",
    "/images/logo4.png",
  ];
  
  const Manufacturers = () => (
    <section className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Manufacturers</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {logos.map((src, i) => (
          <img key={i} src={src} alt={`Manufacturer ${i + 1}`} className="w-32 h-auto object-contain" />
        ))}
      </div>
    </section>
  );
  
  export default Manufacturers;
  