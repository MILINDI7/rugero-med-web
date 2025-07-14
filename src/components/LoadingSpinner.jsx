import './LoadingSpinner.css';
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
        <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
    </div>

    <div className="loader-container">
        <div className="loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
        <div className="loading-text">LOADING</div>
        <div className="loading-progress"></div>
    </div>
    </div>
  );
};

export default LoadingSpinner;