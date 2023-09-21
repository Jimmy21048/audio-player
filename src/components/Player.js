import Track from './Track';
import Controls from './Controls';
import {tracks} from '../data/tracks';
import { useState, useRef } from 'react';
import './styles/styles.css'
import TrackList from './trackList';

export default function Player() {
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [light, setLight] = useState(true);

    return (
        <div className={light ? 'light-player' : 'dark-player' }>
            <div className='change-mode'>
                <button className='light-mode' onClick={() => setLight(!light)}>
                    {
                        light ? 'DARK' : 'LIGHT'
                    }
                </button>
            </div>
            <div className='track-tracklist'>
                <Track
                {...{currentTrack, audioRef, setDuration, progressBarRef}} />
                <TrackList
                {...{setCurrentTrack, tracks}} />
            </div>
            <Controls
            {...{audioRef, setCurrentTrack, trackIndex, setTrackIndex, progressBarRef, timeProgress, setTimeProgress, duration}} />
        </div>
    )
}