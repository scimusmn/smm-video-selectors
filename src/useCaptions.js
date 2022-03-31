import { useState, useEffect } from 'react';

export default function useCaptions(video, track, show) {
  const [captions, setCaptions] = useState('');

  useEffect(() => {
    const textTrack = video.current.textTracks[track];
    function onCueChange() {
      textTrack.mode = 'hidden';
      if (textTrack.activeCues.length) {
        setCaptions(textTrack.activeCues[0].text);
      }
      if (!show) setCaptions('');
    }

    textTrack.addEventListener('cuechange', onCueChange);
    return () => {
      textTrack.removeEventListener('cuechange', onCueChange);
    };
  }, [captions]);

  return captions;
}
