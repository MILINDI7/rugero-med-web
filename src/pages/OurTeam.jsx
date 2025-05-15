const team = [
    { name: "Alice M.", title: "CEO", image: "/images/ceo.jpg" },
    { name: "John D.", title: "Operations Manager", image: "/images/ops.jpg" },
  ];
  
  const OurTeam = () => (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <div key={i} className="text-center border rounded p-4 shadow">
            <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default OurTeam;
  