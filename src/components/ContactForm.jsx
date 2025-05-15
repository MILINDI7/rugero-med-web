const ContactForm = () => (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
  
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-2"><strong>Address:</strong> Kigali, Rwanda</p>
          <p className="mb-2"><strong>Email:</strong> info@rugeromed.com</p>
          <p className="mb-4"><strong>Phone:</strong> +250 788 123 456</p>
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Kigali,%20Rwanda&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-64 border rounded"
            loading="lazy"
          ></iframe>
        </div>
  
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" required />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <textarea placeholder="Your Message" className="w-full p-2 border rounded h-32" required />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
  
  export default ContactForm;
  