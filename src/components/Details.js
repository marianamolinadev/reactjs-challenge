import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { SpinnerContext } from "../Contexts/SpinnerContext";
import { Link } from "react-router-dom";
import { SharedConstants } from "../sharedConstant";

import "./Details.scss";

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
        part: "snippet",
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
        title: info.snippet?.title,
        description: info.snippet?.description,
        thumb: info.snippet?.thumbnails.maxres.url,
        publishedDate: new Date(info.snippet.publishedAt).toLocaleDateString(
          "en-GB",
          { day: "numeric", month: "short", year: "numeric" }
        ),
        channelId: info.snippet.channelId,
        channelTitle: info.snippet.channelTitle,
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
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="px-5">
        {video && (
          <div>
            <h1 className="text-2xl mb-5 font-bold">{video.title}</h1>
            <div className="flex flex-col md:flex-row gap-5">
              <img
                src={video.thumb}
                alt=""
                className="rounded-lg md:max-w-sm lg:max-w-lg xl:max-w-xl"
              />
              <div>
                <h2 className="font-medium">{video.channelTitle}</h2>
                <p className="text-gray-400	">{video.publishedDate}</p>
                <p className="mt-2">{video.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
