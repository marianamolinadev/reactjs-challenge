import { useContext } from "react";
import { TotalViewsContext } from "../Contexts/TotalViewsContext";
import "./Video.scss";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";

const Video = ({ size, video }) => {
  const { totalViews, setTotalViews, watchedVideos, setWatchedVideos } =
    useContext(TotalViewsContext);

  function saveWatchedVideo() {
    console.log(watchedVideos);
    if (!watchedVideos[video.id]) {
      setWatchedVideos[video.id] = true;
      setTotalViews(totalViews + 1);
    }
  }

  return (
    <div>
      {size == "small" ? (
        <div>
          <img
            className="video video--small"
            src={video?.snippet?.thumbnails.medium.url}
            alt=""
          />
          <p className="text-left	truncate">
            {decodeURI(video?.snippet?.title ?? "")}
          </p>
        </div>
      ) : (
        <div>
          <YouTube
            className="video video--big"
            videoId={video.id}
            onPlay={() => saveWatchedVideo()}
          />
          <div className="flex gap-5 items-baseline">
            <h2>{decodeURI(video?.snippet?.title ?? "")}</h2>
            <Link to={`/details/${video.id}`}>View details</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
