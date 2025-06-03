import "./Contact.css";

const Contact = () => (
  <section className="contact-section">
    <h2 className="contact-header">Contact Us</h2>
    <form className="contact-form">
      <input type="text" placeholder="First name" className="contact-input" required />
      <input type="text" placeholder="Last name" className="contact-input" required />
      <input type="email" placeholder="Email" className="contact-input" required />
      <textarea placeholder="Message" className="contact-textarea" required />
      <button type="submit" className="contact-button">Submit</button>
    </form>
  </section>
);

export default Contact;
