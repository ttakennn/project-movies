import './Loading.scss';

const Loading = () => {
  return (
    <div 
      className="loading-overlay"
      // style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading; 