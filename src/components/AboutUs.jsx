import './AboutUs.css';

const AboutUs = () => (
  <section className="aboutus-section">
    <h2 className="aboutus-title">About Us</h2>
    <div className="aboutus-cards">
      <div className="aboutus-card aboutus-card-row">
        <div className="aboutus-card-text">
          <h3 className="aboutus-card-title">Our History</h3>
          <p>
            Founded in 1995 by Dr. Emmanuel Rugero, RugeroMed began as a small family business with a mission to provide high-quality, affordable medical equipment. Over the years, we expanded our reach across Africa, partnering with global brands and introducing innovative healthcare solutions tailored to local needs. Today, we are a trusted leader in medical equipment, serving thousands of healthcare providers and empowering excellence in patient care.
          </p>
        </div>
        <img src="/images/medical-future.jpg" alt="History" className="aboutus-card-img" />
      </div>
      <div className="aboutus-card aboutus-card-row-reverse">
        <img src="/images/medical-heart.jpg" alt="Mission" className="aboutus-card-img" />
        <div className="aboutus-card-text">
          <h3 className="aboutus-card-title">Our Mission</h3>
          <p>
            At RugeroMed, our mission is to bridge the gap in healthcare by providing reliable, innovative, and affordable medical equipment. We are committed to empowering healthcare providers with the tools they need to deliver exceptional care, ensuring healthier communities and better patient outcomes.
          </p>
        </div>
      </div>
      <div className="aboutus-card aboutus-card-row">
        <div className="aboutus-card-text">
          <h3 className="aboutus-card-title">Our Goals</h3>
          <p>
            To become a leading supplier in East Africa by 2030 through innovation and partnerships, continually improving healthcare delivery and accessibility for all.
          </p>
        </div>
        <img src="/images/medical-future.jpg" alt="Goals" className="aboutus-card-img" />
      </div>
    </div>
  </section>
);

export default AboutUs;
  