import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;
    if (isVideoPlaying) {
      videoRef.current.play();
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          className={`block h-full w-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`}
          src={thumbnailUrl}
          alt=""
        />
        <div className="absolute bottom-1 right-1 rounded bg-secondary-dark px-0.5 text-sm text-secondary">
          {formatDuration(duration)}
        </div>
        <video
          className={`absolute inset-0 block h-full object-cover transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
        ></video>
      </a>
      <div className="flex flex-row gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            className="h-12 w-12 rounded-full"
            src={channel.profileUrl}
            alt=""
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-sm text-secondary-text">
            {channel.name}
          </a>
          <a href={`/@${channel.id}`} className="text-sm text-secondary-text">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </a>
        </div>
      </div>
    </div>
  );
}

export default VideoGridItem;
