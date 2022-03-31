/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '@components/VideoPlayer';

function VideoList(props) {
  const {
    content,
    screenHeight,
    screenWidth,
    titleLang1,
    titleLang2,
    graphic,
    slug,
  } = props;
  const [showList, setShowList] = useState(true);
  const [videoSelection, setVideoSelection] = useState('');
  const listItems = content.map((video, index) => (
    <div key={index}>
      { showList && (
      <div onClick={() => {
        setVideoSelection(index);
        setShowList(false);
      }}
      >
        <button type="button" className="list-button" id={`button${index}`}>
          {video.selectionImageLang1 && <img className="selection-image" src={video.selectionImageLang1} alt="selectionImage" /> }
          <div className="title-wrap">
            <div className="video-name1">{video.lang1Name}</div>
            <hr />
            <div className="video-name2">{video.lang2Name !== video.lang1Name ? video.lang2Name : null}</div>
          </div>
        </button>
      </div>
      )}
      {videoSelection === index && (
        <VideoPlayer
          video={video}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      )}
    </div>
  ));

  return (
    <div className={slug}>
      <div className="component-container" style={{ height: `${screenHeight}px`, width: `${screenWidth}px` }}>
        {showList && (
          <>
            <div className="graphic" style={{ backgroundImage: `url(${graphic})` }} />
            <div className="title-container">
              <div className="title1">{titleLang1}</div>
              <div className="title2">{titleLang2 !== titleLang1 ? titleLang2 : null}</div>
            </div>
          </>
        )}
        <div className="list-container">
          {listItems}
        </div>
      </div>
    </div>
  );
}

VideoList.defaultProps = {
  titleLang1: '',
  titleLang2: '',
  graphic: '',
};

VideoList.propTypes = {
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
  titleLang1: PropTypes.string,
  titleLang2: PropTypes.string,
  screenHeight: PropTypes.string.isRequired,
  screenWidth: PropTypes.string.isRequired,
  graphic: PropTypes.string,
  slug: PropTypes.string.isRequired,
};

export default VideoList;
