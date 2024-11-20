import React from "react";
import { MdFastRewind, MdSkipNext } from "react-icons/md";
import { IoIosFastforward } from "react-icons/io";
import {
  FaPause,
  FaVolumeUp,
  FaStop,
  FaPlay,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { Slider } from "../ui/slider";

type Props = {
  title: string;
  playPauseHandler: () => void;
  isPlaying: boolean;
  played: any;
  onSeek: (value: number) => void;
  onSeekMouseUp: (value: number) => void;
  volume: number;
  onVolumeChangeHandler: (value: number) => void;
  onVolumeSeekUp: (value: number) => void;
  duration: any;
  playedTime: any;
  isMuted: boolean;
  handleMute: () => void;
  isInFullScreen: boolean;
  handleFullScreen: () => void;
};

const VideoPlayerController: React.FC<Props> = ({
  title,
  playPauseHandler,
  isPlaying,
  played,
  onSeek,
  onSeekMouseUp,
  volume,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  duration,
  playedTime,
  isMuted,
  handleMute,
  isInFullScreen,
  handleFullScreen,
}: Props) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className="">
      <div className="flex items-center justify-between px-20  text-white font-bold ">
        <h2>{title}</h2>
      </div>
      <div className=" bg-primary-color py-5 rounded-b-lg">
        <div className="flex py-0 px-10">
          <Slider
            defaultValue={[0]}
            max={100}
            step={1}
            value={[played * 100]}
            onValueChange={(value) => onSeek(value[0])}
            onValueCommit={(value) => onSeekMouseUp(value[0])}
          />
        </div>

        <div className="mx-10 my-3 text-white flex flex-row">
          <div className="w-1/2">{formatTime(playedTime)}</div>
          <div className="w-1/2  text-right">{formatTime(duration)} </div>
        </div>

        <div className="ml-10 flex items-center justify-start">
          <div className="flex px-0 items-center w-1/2">
            <div className="icon__btn" onClick={playPauseHandler}>
              {isPlaying ? (
                <FaPause
                  fontSize="medium"
                  className=" text-white text-2xl cursor-pointer"
                />
              ) : (
                <FaPlay className=" text-white text-2xl cursor-pointer" />
              )}
            </div>

            <div className="py-0 px-5  text-white">
              <MdFastRewind className="text-white text-2xl cursor-pointer" />
            </div>
            <div className="py-0 px-5  text-white">
              <FaStop className="text-white text-2xl cursor-pointer" />
            </div>
            <div className="py-0 px-5  text-white">
              <IoIosFastforward className="text-white text-2xl cursor-pointer" />
            </div>

            <div className="py-0 px-5  text-white" onClick={handleFullScreen}>
              {!isInFullScreen ? (
                <FaCompress className="text-white text-2xl cursor-pointer" />
              ) : (
                <FaExpand className="text-white text-2xl cursor-pointer" />
              )}
            </div>

            <div className="py-0 px-5  text-white" onClick={handleMute}>
              {isMuted ? (
                <FaVolumeMute className="text-white text-2xl cursor-pointer" />
              ) : (
                <FaVolumeUp className="text-white text-2xl cursor-pointer" />
              )}
            </div>

            <Slider
              defaultValue={[33]}
              max={100}
              step={1}
              value={[volume * 100]}
              onValueChange={(value) => onVolumeChangeHandler(value[0])}
              onValueCommit={(value) => onVolumeSeekUp(value[0])}
              className="max-w-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerController;
