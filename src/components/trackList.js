import { useState } from "react";
export default function TrackList ({setCurrentTrack, tracks}) {
    return (
        <div className="track-list">
                    <ul>
                    {
                        tracks.map((track) => {
                            return <li key={track.title}>
                                <button>
                                {track.title} <br/>
                                {track.artist}
                                </button>
                                
                            </li>
                        })
                    }
                </ul>
        </div>
    )
}