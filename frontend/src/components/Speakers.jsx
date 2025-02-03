/* eslint-disable react/prop-types */
import { HiOutlineSpeakerWave } from "react-icons/hi2";

function Speakers({ fromAudioRef, toAudioRef }) {
  const handlePlayAudio = (audiotoplay) => {
    if (audiotoplay === "from" && fromAudioRef.current) {
      console.log(fromAudioRef);

      fromAudioRef.current.play();
    } else if (audiotoplay === "to" && toAudioRef.current) {
      console.log(toAudioRef);

      toAudioRef.current.play();
    }
  };
  return (
    <div className="speaker-icon icon">
      <HiOutlineSpeakerWave size={35} />
      <div className="play-btn-cont">
        <div className="play-btn" onClick={() => handlePlayAudio("from")}>
          play from word
        </div>
        <hr />
        <div className="play-btn" onClick={() => handlePlayAudio("to")}>
          play translated word
        </div>
      </div>
    </div>
  );
}

export default Speakers;
