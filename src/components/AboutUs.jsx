import './AboutUs.css';

const AboutUs = () => (
  <section className="aboutus-section">
    <h2 className="aboutus-title">About Us</h2>
    <div className="aboutus-cards">
      <div className="aboutus-card aboutus-card-row">
        <div className="aboutus-card-text">
          <h3 className="aboutus-card-title">Our History</h3>
          <p>
            Founded in 1995 by Dr. Emmanuel Rugero, RugeroMed began as a small family business with a mission to provide high-quality, affordable medical equipment...
          </p>
        </div>
        <img src={`${process.env.PUBLIC_URL}/images/medical-future.jpg`} alt="History" className="aboutus-card-img" />
      </div>
      <div className="aboutus-card aboutus-card-row-reverse">
        <img src={`${process.env.PUBLIC_URL}/images/medical-heart.jpg`} alt="Mission" className="aboutus-card-img" />
        <div className="aboutus-card-text">
          <h3 className="aboutus-card-title">Our Mission</h3>
          <p>
            At RugeroMed, our mission is to bridge the gap in healthcare by providing reliable, innovative, and affordable medical equipment...
          </p>
        </div>
      </div>
      <div className="aboutus-card aboutus-card-row">
        <div className="aboutus-card-text">
          <h3 className="aboutus-card-title">Our Goals</h3>
          <p>
            To become a leading supplier in East Africa by 2030 through innovation and partnerships...
          </p>
        </div>
        <img src={`${process.env.PUBLIC_URL}/images/medical-future.jpg`} alt="Goals" className="aboutus-card-img" />
      </div>
    </div>
  </section>
);

export default AboutUs;
