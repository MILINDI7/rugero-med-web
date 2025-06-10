import "./OurTeam.css";

const team = [
  {
    name: "Patrick HIGIRO",
    title: "Managing Director",
    image: `${process.env.PUBLIC_URL}/images/patrick.jpg`,
  },
  {
    name: "Sandra KWIZERA",
    title: "General Manager",
    image: `${process.env.PUBLIC_URL}/images/sandra.jpg`,
  },
  {
    name: "Ines IRADUKUNDA",
    title: "Sales representative",
    image: `${process.env.PUBLIC_URL}/images/ines.jpg`,
  },
  {
    name: "Pacifique HABINSHUTI",
    title: "Logistics technician",
    image: `${process.env.PUBLIC_URL}/images/pacifique.jpg`,
  },
  {
    name: "Nouriah UMUHIRE",
    title: "Biomedical Expert",
    image: `${process.env.PUBLIC_URL}/images/nouriah.jpg`,
  },
];

const OurTeam = () => (
  <section className="our-team-section">
    <h2 className="team-heading">Our team</h2>
    <p className="team-subheading">
      Our team is committed to providing exceptional customer service, <br />
      and we work closely with our clients to ensure <br />
      that their unique needs are met
    </p>

    <div className="team-grid">
      {team.map((member, i) => (
        <div key={i} className="team-card">
          <img src={member.image} alt={member.name} className="team-img" />
          <h3 className="team-name">{member.name}</h3>
          <p className="team-title">{member.title}</p>
        </div>
      ))}
    </div>
  </section>
);

export default OurTeam;
