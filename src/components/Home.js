import "./Home.scss";

const recommendedVideos = [1, 2, 3, 4];

const Home = () => {
  return (
    <div className="home-container">
      <div className="search-bar">
        <div className="input-container">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input type="text" placeholder="Video name..." />
        </div>
        <button className="primary-button">Search</button>
      </div>
      <div className="content">
        <div className="last-watched-videos">
          <div className="video video--big"></div>
          <div className="flex gap-5 items-baseline">
            <h2>The name of the video</h2>
            <a href="/">Watch</a>
          </div>
        </div>
        <div className="recommended-videos">
          <p>Videos watched: 17</p>
          <div className="recommended-videos_list">
            {recommendedVideos.map((rV) => (
              <div className="video video--small" key={rV}>
                {rV}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
