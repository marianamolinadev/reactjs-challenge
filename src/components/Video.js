import "./Video.scss";

const Video = ({ size, video }) => {
  if (size == "small") {
    return (
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
    );
  } else {
    return (
      /* <video className="video video--small" controls>
        <source
          src={"https:www.youtube.com/watch?v=" + video?.id.videoId}
          type="video/mp4"
        />
        <track src="" kind="captions" label="captions" />
        Your browser does not support the video tag.
      </video> */
      <div>
        <iframe
          className="video video--big"
          src={`https:www.youtube.com/embed/${video?.id.videoId}?enablejsapi=1`}
          title="myFrame"
        ></iframe>
        <div className="flex gap-5 items-baseline">
          <h2>{decodeURI(video?.snippet?.title ?? "")}</h2>
          <a href="/">Details</a>
        </div>
      </div>
    );
  }
};

export default Video;
