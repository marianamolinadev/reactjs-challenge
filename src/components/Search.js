import "./Search.scss";
import { useState, useEffect } from "react";
import Video from "./Video";
import { SharedConstants } from "../sharedConstant";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    requestVideos(filter);
  }, []);

  async function requestVideos(filter) {
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

    setSelectedVideo(json.items[0]);
    setFilteredVideos(json.items);
  }

  async function changeSelectedVideo(video) {
    setSelectedVideo(video);
  }

  return (
    <div className="home-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestVideos(filter);
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
            <div className="primary-video">
              <Video size="big" video={selectedVideo} />
            </div>
            <div className="suggested-video">
              {filteredVideos
                .filter((video) => video.id != selectedVideo?.id)
                ?.map((video) => (
                  <button
                    key={video.id.videoId}
                    onClick={() => changeSelectedVideo(video)}
                  >
                    <Video size="small" video={video} />
                  </button>
                ))}
              <p className="watched-videos">Videos watched: 17</p>
            </div>
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
            <h3 className="text-xl">Loading...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;