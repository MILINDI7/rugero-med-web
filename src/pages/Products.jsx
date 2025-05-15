const products = [
    { name: "Ventilator", image: "/images/ventilator.jpg", price: "$1,200" },
    { name: "Ultrasound Machine", image: "/images/ultrasound.jpg", price: "$5,000" },
  ];
  
  const Products = () => (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <div key={i} className="bg-white border rounded p-4 shadow text-center">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-blue-700 font-bold">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default Products;
  