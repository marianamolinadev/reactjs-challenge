import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { SpinnerContext } from "../Contexts/SpinnerContext";
import { Link } from "react-router-dom";
import { SharedConstants } from "../sharedConstant";

import "./Details.scss";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import EyeIcon from "../icons/EyeIcon";
import BackIcon from "../icons/BackIcon";

const Details = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);

  const { setSpinner } = useContext(SpinnerContext);

  useEffect(() => {
    requestVideoDetails();
  }, []);

  async function requestVideoDetails() {
    try {
      setSpinner(true);
      const params = {
        part: "snippet%2Cstatistics",
        maxResults: 1,
        id: id,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      };

      const qs = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
      const videoRes = await fetch(`${SharedConstants.API_URL}/videos?${qs}`);
      const json = await videoRes?.json();

      const info = json.items[0];

      const video = {
        title: info.snippet?.title ?? "No title",
        description: info.snippet?.description ?? "-",
        thumb:
          info.snippet?.thumbnails?.maxres?.url ??
          info.snippet?.thumbnails?.high?.url ??
          info.snippet?.thumbnails?.medium?.url ??
          info.snippet?.thumbnails?.default?.url ??
          null,
        publishedDate: new Date(info.snippet.publishedAt).toLocaleDateString(
          "en-GB",
          { day: "numeric", month: "short", year: "numeric" }
        ),
        channelId: info.snippet?.channelId ?? "No channel ID",
        channelTitle: info.snippet?.channelTitle ?? "No channel name",
        likeCount: info.statistics?.likeCount ?? 0,
        dislikeCount: info.statistics?.dislikeCount ?? 0,
        viewCount: info.statistics?.viewCount ?? 0,
      };

      setVideo(video);
    } catch (e) {
      console.log(e);
      // setResponseError(e.message);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <div>
      <div className="p-5 w-full">
        <Link to={`/`} className="back-icon">
          <BackIcon />
        </Link>
      </div>
      <div className="px-5">
        {video && (
          <div>
            <h1 className="text-2xl mb-5 font-bold">{video.title}</h1>
            <div className="flex flex-col lg:flex-row gap-5 my-5">
              {video.thumb ? (
                <img
                  src={video.thumb}
                  alt=""
                  className="rounded-lg lg:max-w-lg xl:max-w-xl"
                />
              ) : (
                <div className="flex gap-2 justify-center items-center rounded-lg w-96 h-60 lg:max-w-lg xl:max-w-xl bg-blue-100">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <h2>No video thumbnail found</h2>
                </div>
              )}
              <div>
                <h2 className="font-medium">{video.channelTitle}</h2>
                <p className="text-gray-400">{video.publishedDate}</p>
                <p className="mt-2">{video.description}</p>
                <h3 className="mt-10 text-lg font-medium text-gray-600">
                  Statistics
                </h3>
                <div className="mt-5 text-blue-400 pl-5 border-l-2">
                  <div className="line-details">
                    <ThumbUpIcon />
                    <p>{parseFloat(video.likeCount).toLocaleString("en-US")}</p>
                  </div>
                  <div className="line-details">
                    <ThumbDownIcon />
                    <p>
                      {parseFloat(video.dislikeCount).toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="line-details">
                    <EyeIcon />
                    <p>{parseFloat(video.viewCount).toLocaleString("en-US")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
