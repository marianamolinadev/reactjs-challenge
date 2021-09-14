import { expect, test } from "@jest/globals";
import Video from "../components/Video";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom";

test("small video displays a default thumbnail", async () => {
  const video = render(
    <StaticRouter>
      <Video size="small" />
    </StaticRouter>
  );

  const videoThumbnail = await video.findByTestId("thumbnail");
  expect(videoThumbnail.src).toContain("none.png");
});

test("small video displays a non default thumbnail", async () => {
  const videoParam = {
    id: { videoId: "XMW3giznx-U" },
    snippet: {
      title: "El hijo de Hernández",
      channelTitle: "Cuarteto de Nos",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/XMW3giznx-U/default.jpg",
          width: 120,
          height: 90,
        },
        high: {
          url: "https://i.ytimg.com/vi/XMW3giznx-U/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        medium: {
          url: "https://i.ytimg.com/vi/XMW3giznx-U/mqdefault.jpg",
          width: 320,
          height: 180,
        },
      },
    },
  };

  const video = render(
    <StaticRouter>
      <Video size="small" video={videoParam} />
    </StaticRouter>
  );

  const videoThumbnail = await video.findByTestId("thumbnail");
  expect(videoThumbnail.src).toContain(
    "https://i.ytimg.com/vi/XMW3giznx-U/mqdefault.jpg"
  );
});
