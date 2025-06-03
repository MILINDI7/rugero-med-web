import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsPage.css';

const newsItems = [
  {
    title: "RugeroMed Introduces Advanced Hospital Bed Equipment",
    image: "/images/hospital-bed.jpg",
    description: "RugeroMed, a leading medical equipment store, has launched a new range of advanced hospital beds...",
    link: "/news/hospital-beds"
  },
  {
    title: "RugeroMed Advances Inventory Management",
    image: "/images/inventory.jpg",
    description: "Improved logistics and distribution systems for better facility support.",
    link: "/news/inventory"
  },
   {
    title: "RugeroMed Introduces Advanced Hospital Bed Equipment",
    image: "/images/hospital-bed.jpg",
    description: "RugeroMed, a leading medical equipment store, has launched a new range of advanced hospital beds...",
    link: "/news/hospital-beds"
  },
  {
    title: "RugeroMed Advances Inventory Management",
    image: "/images/inventory.jpg",
    description: "Improved logistics and distribution systems for better facility support.",
    link: "/news/inventory"
  },
   {
    title: "RugeroMed Introduces Advanced Hospital Bed Equipment",
    image: "/images/hospital-bed.jpg",
    description: "RugeroMed, a leading medical equipment store, has launched a new range of advanced hospital beds...",
    link: "/news/hospital-beds"
  },
  {
    title: "RugeroMed Advances Inventory Management",
    image: "/images/inventory.jpg",
    description: "Improved logistics and distribution systems for better facility support.",
    link: "/news/inventory"
  }
];

const impactStories = [
  {
    title: "RugeroMed Pioneers Green Healthcare Solutions",
    icon: "♻️",
    link: "/impact/green-solutions"
  },
  {
    title: "RugeroMed Expands Access to Advanced Diagnostic Devices",
    icon: "🩺",
    link: "/impact/diagnostic-access"
  },
  {
    title: "RugeroMed Pioneers Green Healthcare Solutions",
    icon: "♻️",
    link: "/impact/green-solutions"
  },
  {
    title: "RugeroMed Expands Access to Advanced Diagnostic Devices",
    icon: "🩺",
    link: "/impact/diagnostic-access"
  },
  {
    title: "RugeroMed Pioneers Green Healthcare Solutions",
    icon: "♻️",
    link: "/impact/green-solutions"
  },
  {
    title: "RugeroMed Expands Access to Advanced Diagnostic Devices",
    icon: "🩺",
    link: "/impact/diagnostic-access"
  }
];

const NewsPage = () => {
  const navigate = useNavigate();

  return (
    <div>

      {/* Latest News Section */}
      <section>
        <h2 className="section-title">Latest News</h2>
        <div className="card-slider-wrapper">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="news-card"
              onClick={() => navigate(item.link)}
            >
              <img
                src={`${process.env.PUBLIC_URL}${item.image}`}
                alt={item.title}
              />
              <div className="card-content">
                <div className="card-title">{item.title}</div>
                <div className="card-description">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="impact-section">
        <h2 className="impact-title">Impact Stories</h2>
        <div className="card-slider-wrapper">
          {impactStories.map((story, idx) => (
            <div
              key={idx}
              className="impact-card"
              onClick={() => navigate(story.link)}
            >
              <div className="card-content">
                <div className="card-title">{story.title}</div>
                <div className="impact-icon">{story.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        Copyright © 2024 RugeroMed, All right reserved.
      </footer>
    </div>
  );
};

export default NewsPage;
