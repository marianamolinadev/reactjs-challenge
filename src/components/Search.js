import "./Search.scss";
import { useState, useEffect, useContext } from "react";
import Video from "./Video";
import { SharedConstants } from "../sharedConstant";
import { TotalViewsContext } from "../Contexts/TotalViewsContext";
import { SpinnerContext } from "../Contexts/SpinnerContext";
import SearchIcon from "../icons/SearchIcon";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const { totalViews } = useContext(TotalViewsContext);
  const { setSpinner } = useContext(SpinnerContext);

  useEffect(() => {
    getVideos();
  }, []);

  /**
   * Searchs videos with a global filter
   */
  async function getVideos() {
    try {
      setSpinner(true);

      const params = {
        part: "snippet",
        regionCode: "UY",
        maxResults: 4,
        q: filter ?? "",
        type: "video",
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };

      const responseItems = await requestVideos(params);

      // If there is a response, the first item is set as the "selectedVideo"
      setFilteredVideos(responseItems);
      if (responseItems?.length > 0) {
        setSelectedVideo(responseItems[0]);
      }
    } catch (e) {
      setResponseError(e.message);
    } finally {
      setSpinner(false);
    }
  }

  /**
   * Calls youtube api
   * @param {*} params query params used to call the api
   * @returns api call result
   */
  async function requestVideos(params) {
    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    const res = await fetch(`${SharedConstants.API_URL}/search?${qs}`);
    const json = await res?.json();
    if (json?.error) {
      setResponseError(json.error.message);
    } else if (!json) {
      setResponseError("Something went wrong. Please, try again later!");
    }
    return json.items;
  }

  /**
   * When selectedVideo is changed, the related videos must be load
   * @param {} video
   */
  async function changeSelectedVideo(video) {
    try {
      setSpinner(true);

      const params = {
        part: "snippet",
        regionCode: "UY",
        maxResults: 3,
        relatedToVideoId: video.id.videoId,
        type: "video",
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };

      const responseItems = await requestVideos(params);

      if (responseItems?.length > 0) {
        const newFilteredVideos = [video].concat(responseItems);
        setFilteredVideos(newFilteredVideos);
      }
      setSelectedVideo(video);
    } catch (e) {
      setResponseError(e.message);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <div className="home-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getVideos();
        }}
      >
        <div className="search-bar">
          <div className="input-container">
            <SearchIcon />
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
            {selectedVideo && (
              <div className="primary-video">
                <Video size="big" video={selectedVideo} />
              </div>
            )}
            <div className="suggested-video">
              {filteredVideos
                .filter(
                  (video) => video.id.videoId != selectedVideo?.id.videoId
                )
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
