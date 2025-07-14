import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/actions';
import LoadingSpinner from '../components/LoadingSpinner';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {data, pending, error} = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(fetchNews()); 
  }, [dispatch]);

  if(pending) return <LoadingSpinner />;
  if(error) return <div className="error-message">{error}</div>;
  return (
    <div>

      {/* Latest News Section */}
      <section>
        <h2 className="section-title">Latest News</h2>
        <div className="card-slider-wrapper">
          {data?.news?.map(item => (
            <div
              key={item?._id}
              className="news-card"
              onClick={() => navigate(item.link)}
            >
              <img
                src={item?.imageUrl}
                alt={item?.title}
              />
              <div className="card-content">
                <div className="card-title">{item?.title}</div>
                <div className="card-description">{item?.description}</div>
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
