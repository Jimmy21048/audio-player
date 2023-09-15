import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
  } from 'react-icons/io5';
import { tracks } from "../data/tracks";

export default function Control({audioRef, setCurrentTrack, trackIndex, setTrackIndex, setTimeProgress, progressBarRef, timeProgress, duration}) {
    const [playing, setPlaying] = useState(false);

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        )
        playAnimationRef.current = requestAnimationFrame(repeat);
    },[audioRef, duration, progressBarRef, setTimeProgress])


    const handlePlay = () => {

        setPlaying((prev) => !prev);
    }

    useEffect(() => {
        if(playing) {
            audioRef.current.play();
        }
        else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat)
    },[playing, audioRef, repeat]);

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    const handlePrevious = () => {
        if(trackIndex === 0) {
            let lastTrackIndex = tracks.length -1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
        }
        else {
            setTrackIndex((prev) => prev -1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
    }
    const handleReverse = () => {
        audioRef.current.currentTime -= 15;
    }
    const handleForward = () => {
        audioRef.current.currentTime += 15;
    }
    const handleNext = () => {
        if(trackIndex >= tracks.length -1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        }
        else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
    }

    const formatTime = (time) => {
        if(time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes = 
                minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = 
                seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    }


    return (
        <div className="control">
            <div className="progress-bar">
                <span className="time-current">{formatTime(timeProgress)}</span>
                <input
                type="range"
                ref={progressBarRef}
                defaultValue='0'
                onChange={handleProgressChange} />
                <span className="time">{formatTime(duration)}</span>
            </div>

            <div className="controls-container">
            <div className="controls">
                <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>
                <button onClick={handleReverse}>
                    <IoPlayBackSharp />
                </button>
                <button onClick={handlePlay} id="play-button">
                    {
                        playing ? <IoPauseSharp /> : <IoPlaySharp />
                    }
                </button>
                <button onClick={handleForward}>
                    <IoPlayForwardSharp />
                </button>
                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>
            </div>
        </div>
    )
}