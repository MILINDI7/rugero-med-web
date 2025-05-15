const Contact = () => (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <form className="max-w-lg mx-auto space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" required />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
        <textarea placeholder="Message" className="w-full p-2 border rounded h-32" required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </section>
  );
  
  export default Contact;
  