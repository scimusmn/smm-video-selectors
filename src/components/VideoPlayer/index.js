/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useCaptions from '../../useCaptions';

function VideoPlayer(props) {
  const { currentSelection } = props;
  const videoRef = useRef(null);
  const [fillAmount, setFillAmount] = useState(0);

  useEffect(() => {
    videoRef.current?.load();
  }, [currentSelection]);

  useEffect(() => {
    console.log(fillAmount);
  }, [fillAmount]);

  const captions = Object.keys(currentSelection.captionAssets).map(
    (locale) => useCaptions(videoRef, locale, true),
  );

  function onVideoLoad() {
    // Default captions are hidden, but need to be set to "showing" here to be recognized
    Object.keys(videoRef.current.textTracks).forEach((key) => {
      const track = videoRef.current.textTracks[key];
      if (track) {
        track.mode = 'showing';
        track.mode = 'hidden';
      }
    });

    // progress bar animation
    videoRef.current.addEventListener('timeupdate', () => {
      const percent = videoRef.current.currentTime / videoRef.current.duration;
      // Round to avoid overloading state updates.
      // Multiply by 100 to get a whole number usable by CSS.
      const rounded = (Math.round(percent * 1000) / 1000) * 100;
      if (rounded !== fillAmount) setFillAmount(rounded);
    });

    // To avoid play error on load due to user interaction
    const tryToPlay = setInterval(() => {
      videoRef.current.play()
        .then(() => {
          clearInterval(tryToPlay);
        })
        .catch((error) => {
          console.info('User has not interacted with document yet.', error);
        });
    }, 500);
  }

  function goBack() {
    console.log('Back to menu');
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
    // Apply styles to show menu and hide list items
    document.getElementById('player-wrapper').classList.add('hide-wrapper');
    const items = document.getElementsByClassName('list-item');
    Object.keys(items).map((i) => items[i].classList.remove('hide-selection'));
  }

  function onVideoEnd() {
    goBack();
  }

  return (
    <div id="player-wrapper" className="wrapper hide-wrapper">
      <div id="player-container">
        <video
          id="video"
          ref={videoRef}
          onLoadedData={() => onVideoLoad()}
          onEnded={() => onVideoEnd()}
        >
          <source src={currentSelection.videoAsset} />
          {Object.keys(currentSelection.captionAssets).map((locale) => {
            const captionFile = currentSelection.captionAssets[locale]?.localFile.publicURL;
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
      {Object.keys(currentSelection.captionAssets).map((locale, index) => (
        <div>
          <div key={locale} className={`captions captions${index} ${locale}`}>
            {captions[index]}
          </div>
          <div className={`progress ${locale}`}>
            <div className={`progress-fill ${locale}`} style={{ width: `${fillAmount}%` }} />
          </div>
          <div className="transport-container" onClick={() => goBack()}>Back to menu</div>
        </div>
      ))}
    </div>
  );
}

VideoPlayer.propTypes = {
  currentSelection: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VideoPlayer;
