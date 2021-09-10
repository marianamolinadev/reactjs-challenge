import { useContext } from "react";
import { TotalViewsContext } from "../Contexts/TotalViewsContext";
import "./Video.scss";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import InfoIcon from "../icons/InfoIcon";

const Video = ({ size, video }) => {
  const { totalViews, setTotalViews } = useContext(TotalViewsContext);

  function saveWatchedVideo() {
    setTotalViews(totalViews + 1);
  }

  function decodeString(string) {
    var elem = document.createElement("textarea");
    elem.innerHTML = string;
    return elem.value;
  }

  return (
    <div>
      {size == "small" ? (
        <div className="flex flex-col 2xl:flex-row 2xl:gap-3 2xl:items-center">
          <img
            className="video video--small"
            src={video?.snippet?.thumbnails.medium.url}
            alt=""
          />
          <div className="overflow-hidden">
            <p className="text-left	truncate">
              {decodeString(video?.snippet?.title ?? "")}
            </p>
            <p className="text-left text-xs text-gray-400 truncate">
              {video?.snippet?.channelTitle}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <YouTube
            className="video video--big"
            videoId={video.id.videoId}
            onPlay={() => saveWatchedVideo()}
          />
          <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-baseline">
            <h2>{decodeString(video?.snippet?.title ?? "")}</h2>
            <button className="primary-button blue--button m-5 mt-2 ml-0 md:mr-0 md:ml-5 md:mt-5">
              <InfoIcon />
              <Link to={`/details/${video.id.videoId}`}>View details</Link>
            </button>
          </div>
          <p className="text-left text-xs text-gray-400">
            {video?.snippet?.channelTitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default Video;
