import { Link } from "react-router-dom";
import "./ProjectsAndTrainings.css";

const ProjectsAndTrainings = () => {
  return (
    <>
      <section className="projects-trainings-container">
        <div className="card-wrapper">
          <div className="card">
            <img
              src={`${process.env.PUBLIC_URL}/images/projects.jpg`}
              alt="Projects"
              className="card-img"
            />
            <div className="card-overlay">
              <h2 className="card-title">Projects</h2>
              <p className="card-desc">
                Our projects showcase innovation, dedication, and impact. Explore our diverse initiatives that drive progress and deliver value across various industries.
              </p>
              <Link to="/projects" className="card-link" />
            </div>
          </div>
        </div>

        <div className="card-wrapper training-offset">
          <div className="card">
            <img
              src={`${process.env.PUBLIC_URL}/images/trainings.jpg`}
              alt="Trainings"
              className="card-img"
            />
            <div className="card-overlay">
              <h2 className="card-title">Trainings</h2>
              <p className="card-desc">
                Our training programs empower individuals with practical skills and knowledge, fostering growth and excellence in their fields.
              </p>
              <Link to="/trainings" className="card-link" />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright © 2024 RugeroMed, All right reserved.</p>
      </footer>
    </>
  );
};

export default ProjectsAndTrainings;
