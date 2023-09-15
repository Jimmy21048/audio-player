
export default function Track({currentTrack, audioRef, setDuration, progressBarRef}) {

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }
    return (
        <div className="track">
            <img className="image" src={currentTrack.photo} alt='' width={300}/>
            <audio 
            src={currentTrack.src}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata} />
            <div>
            <p>{currentTrack.title}</p><p>{' '+ currentTrack.artist}</p>
            </div>
        </div>
    )
}