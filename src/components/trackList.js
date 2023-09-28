
export default function TrackList ({setCurrentTrack, tracks}) {

    function handleChangeTrack(track) {
        setCurrentTrack(track)
    }
    return (
        <div className="track-list">
                    <ul>
                    {
                        tracks.map((track) => {
                            return <li key={track.title}>
                                <button onClick={() =>handleChangeTrack(track)}>
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