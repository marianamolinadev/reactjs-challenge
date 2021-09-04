import "./Search.scss";
import { useState, useEffect } from "react";
import Video from "./Video";
import { SharedConstants } from "../sharedConstant";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(null);

  useEffect(() => {
    requestRecommendedVideos();
  }, []);

  async function requestRecommendedVideos(filter) {
    const params = {
      part: "snippet",
      maxResults: 4,
      q: filter ?? "",
      type: "video",
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };
    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    const res = await fetch(`${SharedConstants.API_URL}/search?${qs}`);
    const json = await res.json();

    setFilteredVideos(json.items);
  }

  const searchVideo = () => {
    requestRecommendedVideos(filter);
  };

  return (
    <div className="home-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchVideo();
        }}
      >
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
            <input
              type="text"
              placeholder="Video name..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <button className="primary-button">Search</button>
        </div>
      </form>

      <div className="content">
        {filteredVideos?.length > 0 ? (
          <div className="video_list">
            {filteredVideos?.map((rV, index) => (
              <div
                key={rV.id.videoId}
                className={index === 0 ? "primary-video" : "suggested-video"}
              >
                <Video size={index === 0 ? "big" : "small"} video={rV} />
              </div>
            ))}
            <p className="watched-videos">Videos watched: 17</p>
          </div>
        ) : filteredVideos ? (
          <div className="text-center">
            <h3 className="text-lg">No results</h3>
            <p className="text-gray-400">
              There were no results matching your search. Try with a different
              search term.
            </p>
          </div>
        ) : (
          <div className="loading">
            <h3 className="text-xl">Cargando...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
