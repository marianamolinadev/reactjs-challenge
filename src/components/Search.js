import "./Search.scss";
import { useState, useEffect, useContext } from "react";
import Video from "./Video";
import { SharedConstants } from "../sharedConstant";
import { TotalViewsContext } from "../Contexts/TotalViewsContext";
import { SpinnerContext } from "../Contexts/SpinnerContext";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const { totalViews } = useContext(TotalViewsContext);
  const { setSpinner } = useContext(SpinnerContext);

  useEffect(() => {
    requestVideos(filter);
  }, []);

  async function requestVideos(filter) {
    try {
      setSpinner(true);

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
      const json = await res?.json();

      if (json?.items?.length > 0) {
        setSelectedVideo(json.items[0]);
        setFilteredVideos(json.items);
      } else if (json?.items?.length === 0) {
        setFilteredVideos([]);
      }
      if (json?.error) {
        setResponseError(json.error.message);
      } else if (!json) {
        setResponseError("Something went wrong. Please, try again later!");
      }
    } catch (e) {
      setResponseError(e.message);
    } finally {
      setSpinner(false);
    }
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
              <p className="watched-videos">Videos watched: {totalViews}</p>
            </div>
          </div>
        ) : (
          filteredVideos && (
            <div className="text-center">
              <h3 className="text-lg">No results</h3>
              <p className="text-gray-400">
                There were no results matching your search. Try with a different
                search term.
              </p>
            </div>
          )
        )}
        {responseError && (
          <div className="text-center">
            <h3 className="text-lg">Error</h3>
            <p className="text-gray-400">{responseError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
