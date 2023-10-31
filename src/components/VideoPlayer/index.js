/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */

import React, { useState, useEffect, useRef } from 'react';
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
  const captions1 = useCaptions(videoRef, 0, true);
  let captions2 = useCaptions(videoRef, 1, true);

  console.log('video', video);

  const captionsTrack1 = video.captions['en-US']?.localFile.publicURL;
  const captionsTrack2 = video.captions['es-MX']?.localFile.publicURL;

  console.log('captionsTrack1', captionsTrack1);
  console.log('captionsTrack2', captionsTrack2);

  // hide default second caption if there's only a primary language
  if (captionsTrack1 === captionsTrack2) {
    captions2 = useCaptions(videoRef, 1, false);
  }

  const [wrappedCaptions1, setWrappedCaptions1] = useState('');
  const [wrappedCaptions2, setWrappedCaptions2] = useState('');

  useEffect(() => {
    setWrappedCaptions1(captions1);
    setWrappedCaptions2(captions2);
  }, [captions1, captions2]);

  function onVideoLoad() {
    // if there are 2 languages, show both
    videoRef.current.textTracks[1].mode = 'showing';
    // play when selected
    videoRef.current.play();
    // go to select screen when video is done
    videoRef.current.onended = () => window.location.reload();
    // set time for progress bar animation
    videoRef.current.addEventListener('timeupdate', () => {
      const percent = Math.floor((100 / (videoRef.current.duration))
      * videoRef.current.currentTime);
      setFillAmount(`${percent.toString()}%`);
    });
  }

  console.log('video', video);
  console.log(video.media);

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
          <track default kind="subtitles" src={captionsTrack1} />
          <track default kind="subtitles" src={captionsTrack2} />
        </video>
      </div>
      <div className="captions-wrapper">
        <div className="captions">
          {wrappedCaptions1}
        </div>
        <div className="captions captions2">{wrappedCaptions2}</div>
      </div>
      <div className="progress-background" />
      <div className="progress" style={{ width: fillAmount }} />
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
