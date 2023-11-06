/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useCaptions from '../../useCaptions';

function VideoPlayer(props) {
  const {
    video,
    screenHeight,
    screenWidth,
  } = props;

  const videoRef = useRef(null);
  const [fillAmount, setFillAmount] = useState(0);

  const captions = Object.keys(video.captions).map(
    (locale) => useCaptions(videoRef, locale, true),
  );

  function onVideoLoad() {
    // Set all textTrack modes to 'showing'
    Object.keys(videoRef.current.textTracks).forEach((key) => {
      const track = videoRef.current.textTracks[key];
      if (track) track.mode = 'showing';
    });

    // play when selected
    videoRef.current.play();
    // go to select screen when video is done
    videoRef.current.onended = () => window.location.reload();
    // set time for progress bar animation
    videoRef.current.addEventListener('timeupdate', () => {
      const percent = videoRef.current.currentTime / videoRef.current.duration;
      // Round to the nearest third decimal to avoid overloading state updates.
      // We also multiply by 100 to get a whole number usable by CSS.
      const rounded = (Math.round(percent * 1000) / 1000) * 100;
      if (rounded !== fillAmount) setFillAmount(rounded);
    });
  }

  return (
    <>
      <div className="center player">
        <video
          id="video"
          ref={videoRef}
          height={screenHeight}
          width={screenWidth}
          onLoadedData={() => onVideoLoad()}
        >
          <source src={video.media} />
          {Object.keys(video.captions).map((locale) => {
            const captionFile = video.captions[locale]?.localFile.publicURL;
            if (!captionFile) return null;
            return (
              <track
                key={locale}
                id={locale}
                srcLang={locale}
                src={captionFile}
                kind="subtitles"
                default
              />
            );
          })}
        </video>
      </div>
      <div className="captions-wrapper">
        {Object.keys(video.captions).map((locale, index) => (
          <div key={locale} className={`captions captions${index} ${locale}`}>
            {captions[index]}
          </div>
        ))}
      </div>
      <div className="progress-container">
        <div className="progress-background" />
        <div className="progress" style={{ width: `${fillAmount}%` }} />
      </div>
      <div className="transport-container">
        <div className="icon" onClick={() => window.location.reload()} />
      </div>
    </>
  );
}

VideoPlayer.propTypes = {
  video: PropTypes.objectOf(PropTypes.any).isRequired,
  screenHeight: PropTypes.string.isRequired,
  screenWidth: PropTypes.string.isRequired,
};

export default VideoPlayer;
