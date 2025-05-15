const feedbacks = [
    { name: "Dr. Jane", text: "RugeroMed provides top-notch products. Highly reliable!" },
    { name: "Nurse Eric", text: "Excellent service and fast delivery every time." },
    { name: "Dr. Amani", text: "They understand our needs and exceed expectations." },
  ];
  
  const Feedback = () => (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Client Feedback</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {feedbacks.map((fb, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="italic mb-2">"{fb.text}"</p>
            <p className="text-right font-semibold">- {fb.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default Feedback;
  