import Track from './Track';
import Controls from './Controls';
import {tracks} from '../data/tracks';
import { useState, useRef } from 'react';
import './styles/styles.css'

export default function Player() {
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();
    return (
        <div className="player">
            <Track
            {...{currentTrack, audioRef, setDuration, progressBarRef}} />
            <Controls
            {...{audioRef, setCurrentTrack, trackIndex, setTrackIndex, progressBarRef, timeProgress, setTimeProgress, duration}} />
        </div>
    )
}