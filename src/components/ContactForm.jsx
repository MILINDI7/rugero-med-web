import './ContactForm.css';

const ContactForm = () => (
  <section className="contact-sections">
    <div className="contact-grids">
      {/* Left: Contact Info and Map */}
      <div className="contact-infos">
        <h3>Get in touch</h3>
        <div className="contact-details">
          <i>📍</i>
          <span>KG 607 ST, Rugando Kimihurura, Gasabo, Kigali - Rwanda</span>
        </div>
        <div className="contact-details">
          <i>📞</i>
          <span>(+250) 787 541 188</span>
        </div>
        <div className="contact-details">
          <i>📧</i>
          <span>info@rugeromed.com</span>
        </div>
        <iframe
          className="map-embeds"
          title="Kigali Map"
          src="https://maps.google.com/maps?q=Kigali,%20Rwanda&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      {/* Right: Form */}
      <form className="contact-form-containers">
        <h3>Send us a message</h3>
        <p>Our team is committed to providing exceptional customer service</p>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Subject" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>

    {/* Footer */}
    <div className="contact-footers">
      Copyright © 2024 RugeroMed, All right reserved.
    </div>
  </section>
);

export default ContactForm;
