/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import VideoPlayer from '@components/VideoPlayer';

// function VideoList(props) {
//   const {
//     content,
//     screenHeight,
//     screenWidth,
//     graphic,
//   } = props;
//   const [showList, setShowList] = useState(true);
//   const [videoSelection, setVideoSelection] = useState('');

//   const listItems = content.map((video, index) => (
//     <div key={index}>
//       { showList && (
//       <div onClick={() => {
//         setVideoSelection(index);
//         setShowList(false);
//       }}
//       >
//         <button type="button" className="list-button" id={`button${index}`}>
//           {video.selectionImage && <img className="selection-image"
// src={video.selectionImage} alt="selectionImage" /> }
//           <div className="title-wrap">
//             <div className="video-name1">{video.lang1Name}</div>
//             <hr />
//             <div className="video-name2">
// {video.lang2Name !== video.lang1Name ? video.lang2Name : null}</div>
//           </div>
//         </button>
//       </div>
//       )}
//       {videoSelection === index && (
//         <VideoPlayer
//           video={video}
//           screenHeight={screenHeight}
//           screenWidth={screenWidth}
//         />
//       )}
//     </div>
//   ));

function VideoList(props) {
  const {
    selections,
    screenHeight,
    screenWidth,
  } = props;
  const [showList, setShowList] = useState(true);
  const [videoSelection, setVideoSelection] = useState('');

  const listItems = selections.map((selection, index) => (
    <div key={index}>
      {showList && (
        <div
          onClick={() => {
            setVideoSelection(index);
            setShowList(false);
          }}
        >
          <h3>{selection.titleDisplay}</h3>
          {selection.titleDisplays.map((titleDisplay, innerIndex) => (
            <h4 key={innerIndex} className={`selection-title ${Object.keys(titleDisplay)}`}>{Object.values(titleDisplay)}</h4>
          ))}
          <p>{selection.caption}</p>
          <p>{selection.selectionImage}</p>
          <p>{selection.media}</p>
        </div>
      )}
      {/* {videoSelection === index && (
        <VideoPlayer
          video={video}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      )} */}
    </div>
  ));

  return (
    <div>
      <h1>{videoSelection}</h1>
      <div className="component-container" style={{ height: `${screenHeight}px`, width: `${screenWidth}px` }}>
        <div className="list-container">
          {listItems}
        </div>
      </div>
    </div>
  );
}

VideoList.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.any).isRequired,
  screenHeight: PropTypes.string.isRequired,
  screenWidth: PropTypes.string.isRequired,
};

export default VideoList;
