import './Feedback.css';

const feedbacks = [
  {
    name: "Dr. Jane",
    text: "Responsive customer service that addresses inquiries and resolves issues efficiently.",
    stars: 3,
  },
  {
    name: "Nurse Eric",
    text: "Responsive customer service that addresses inquiries and resolves issues efficiently.",
    stars: 4,
  },
  {
    name: "Dr. Amani",
    text: "Offers a wide range of medical equipment catering to various healthcare needs.",
    stars: 3,
  },
  {
    name: "Dr. Chantal",
    text: "Expand the product catalog to include the latest innovations in medical technology.",
    stars: 3,
  },
];

const Feedback = () => (
  <section className="feedback-section">
    <h2 className="feedback-title">Client’s Feedback</h2>
    <div className="feedback-slider">
      <div className="feedback-track">
        {feedbacks.map((fb, i) => (
          <div key={i} className="feedback-card">
            <div className="feedback-icon">👤</div>
            <p className="feedback-text">{fb.text}</p>
            <div className="feedback-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < fb.stars ? "star filled" : "star"}>★</span>
              ))}
            </div>
          </div>
        ))}
        {/* Duplicate for infinite scroll */}
        {feedbacks.map((fb, i) => (
          <div key={`dup-${i}`} className="feedback-card">
            <div className="feedback-icon">👤</div>
            <p className="feedback-text">{fb.text}</p>
            <div className="feedback-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < fb.stars ? "star filled" : "star"}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Feedback;
