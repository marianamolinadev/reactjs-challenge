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
import Exclamation from "../icons/Exclamation";
import Calendar from "../icons/Calendar";

const Details = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);

  const { setSpinner } = useContext(SpinnerContext);

  useEffect(() => {
    getVideoDetails();
  }, []);

  async function getVideoDetails() {
    try {
      setSpinner(true);

      const videoInfo = await requestVideoInfo();
      const channelInfo = await requestChannelInfo(
        videoInfo?.snippet?.channelId ?? null
      );
      console.log(channelInfo);

      const video = {
        title: videoInfo.snippet?.title ?? "No title",
        description: videoInfo.snippet?.description ?? "-",
        thumb:
          videoInfo.snippet?.thumbnails?.maxres?.url ??
          videoInfo.snippet?.thumbnails?.high?.url ??
          videoInfo.snippet?.thumbnails?.medium?.url ??
          videoInfo.snippet?.thumbnails?.default?.url ??
          null,
        publishedDate: new Date(
          videoInfo.snippet.publishedAt
        ).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        tags: videoInfo?.snippet?.tags ?? [],
        channelId: videoInfo.snippet?.channelId ?? "No channel ID",
        channelTitle: videoInfo.snippet?.channelTitle ?? "No channel name",
        channelThumb:
          channelInfo.snippet?.thumbnails?.maxres?.url ??
          channelInfo.snippet?.thumbnails?.high?.url ??
          channelInfo.snippet?.thumbnails?.medium?.url ??
          channelInfo.snippet?.thumbnails?.default?.url ??
          null,
        likeCount: videoInfo.statistics?.likeCount ?? 0,
        dislikeCount: videoInfo.statistics?.dislikeCount ?? 0,
        viewCount: videoInfo.statistics?.viewCount ?? 0,
        subscriberCount: channelInfo.statistics.subscriberCount ?? 0,
      };

      setVideo(video);
    } catch (e) {
      console.log(e);
      // setResponseError(e.message);
    } finally {
      setTimeout(() => {
        setSpinner(false);
      }, 5000);
    }
  }

  async function requestVideoInfo() {
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

    return json.items[0];
  }

  async function requestChannelInfo(channelId) {
    const params = {
      part: "snippet%2Cstatistics",
      id: channelId,
      maxResults: 1,
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    };

    const qs = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    const videoRes = await fetch(`${SharedConstants.API_URL}/channels?${qs}`);
    const json = await videoRes?.json();

    return json.items[0];
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
                  alt="video thumb"
                  className="rounded-lg lg:max-w-lg xl:max-w-xl object-cover"
                />
              ) : (
                <div className="flex gap-2 justify-center items-center rounded-lg w-96 h-60 lg:max-w-lg xl:max-w-xl bg-blue-100">
                  <Exclamation />
                  <h2>No video thumbnail found</h2>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  {video.channelThumb && (
                    <img
                      className="rounded-full h-10 w-10"
                      src={video.channelThumb}
                      alt="channel thumb"
                    />
                  )}
                  <div>
                    <h2 className="font-medium text-md">
                      {video.channelTitle}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      <span className="font-medium">
                        {parseFloat(video.subscriberCount).toLocaleString(
                          "en-US"
                        )}{" "}
                      </span>
                      Subscribers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2  mt-5">
                  <Calendar />
                  <p className="text-gray-400">{video.publishedDate}</p>
                </div>
                <p className="mt-2">{video.description}</p>
                <h3 className="mt-10 text-lg font-medium text-gray-600">
                  Statistics
                </h3>
                <div className="mt-5 text-blue-400 pl-5 border-l-2">
                  <div className="line-details">
                    <EyeIcon />
                    <p>
                      <span className="font-medium">
                        {parseFloat(video.viewCount).toLocaleString("en-US")}{" "}
                      </span>
                      Views
                    </p>
                  </div>
                  <div className="line-details">
                    <ThumbUpIcon />
                    <p>
                      <span className="font-medium">
                        {parseFloat(video.likeCount).toLocaleString("en-US")}{" "}
                      </span>
                      Likes
                    </p>
                  </div>
                  <div className="line-details">
                    <ThumbDownIcon />
                    <p>
                      <span className="font-medium">
                        {parseFloat(video.dislikeCount).toLocaleString("en-US")}{" "}
                      </span>
                      Dislikes
                    </p>
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
