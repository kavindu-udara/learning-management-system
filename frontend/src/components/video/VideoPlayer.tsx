import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoPlayerController from "./VideoPlayerController";

interface Props {
  title: string;
  url: string;
  finishedCallback: () => void;
}

const VideoPlayer: React.FC<Props> = ({
  title,
  url,
  finishedCallback,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    Buffer: true,
  });
  const [duration, setDuration] = useState(0);
  const [playedTime, setPlayedTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(videoState.volume);
  const [isInFullScreen, setIsInFullScreen] = useState(false);

  const videoPlayerRef = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const progressHandler = (state: number) => {
    if (!videoState.seeking) {
      setVideoState({ ...videoState, ...state });
      setPlayedTime(state.playedSeconds);
    }
  };

  const seekHandler = (value: number) => {
    setVideoState({ ...videoState, played: parseFloat(value) / 100 });
  };

  const seekMouseUpHandler = (value: number) => {
    setVideoState({ ...videoState, seeking: false });
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(value / 100);
    }
  };
  
  const volumeChangeHandler = (value: number) => {
    const newVolume = parseFloat(value) / 100;
    setCurrentVolume(newVolume);
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
    setIsMuted(newVolume === 0);
  };
  const volumeSeekUpHandler = (value: number) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleMute = () => {
    if (!isMuted) {
      setVideoState({
        ...videoState,
        volume: 0,
        muted: true,
      });
    } else {
      setVideoState({
        ...videoState,
        volume: currentVolume,
        muted: false,
      });
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (playedTime === duration) {
      // TODO : finished function
      if (duration > 0) {
        finishedCallback();
      }
      setIsPlaying(false);
      setVideoState({ ...videoState, playing: false });
    }
  }, [playedTime, duration]);

  // Enter fullscreen
  const openFullscreen = () => {
    if (divRef.current) {
      if (divRef.current.requestFullscreen) {
        divRef.current.requestFullscreen();
      } else if ((divRef.current as any).mozRequestFullScreen) {
        (divRef.current as any).mozRequestFullScreen(); // Firefox
      } else if ((divRef.current as any).webkitRequestFullscreen) {
        (divRef.current as any).webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if ((divRef.current as any).msRequestFullscreen) {
        (divRef.current as any).msRequestFullscreen(); // IE/Edge
      }
    }
  };

  // Exit fullscreen
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen(); // Firefox
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen(); // Chrome, Safari, Opera
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen(); // IE/Edge
    }
  };

  const handleFullScreen = () => {
    isInFullScreen ? closeFullscreen() : openFullscreen();
    setIsInFullScreen(!isInFullScreen);
  };

  return (
    <div className="" onContextMenu={(e) => e.preventDefault()} ref={divRef}>
      <div className="w-full bg-black min-h-[300px] lg:m-h-[300px]">
        <ReactPlayer
          ref={videoPlayerRef}
          url={url}
          playing={isPlaying}
          onProgress={progressHandler}
          volume={videoState.volume}
          width="100%"
          height="100%"
          onDuration={handleDuration}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload", // Prevents download button in some browsers
              },
            },
          }}
        />
      </div>
      <div>
        <VideoPlayerController
          title={title}
          playPauseHandler={playPauseHandler}
          isPlaying={isPlaying}
          played={videoState.played}
          onSeek={seekHandler}
          onSeekMouseUp={seekMouseUpHandler}
          volume={videoState.volume}
          onVolumeChangeHandler={volumeChangeHandler}
          onVolumeSeekUp={volumeSeekUpHandler}
          duration={duration}
          playedTime={playedTime}
          isMuted={isMuted}
          handleMute={handleMute}
          isInFullScreen={isInFullScreen}
          handleFullScreen={handleFullScreen}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
