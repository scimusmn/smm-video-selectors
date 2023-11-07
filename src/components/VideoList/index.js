/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '@components/VideoPlayer';

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
          <button type="button" className="list-button" id={`button${index}`}>
            {selection.selectionImage && <img className="selection-image" src={selection.selectionImage?.localFile.publicURL} alt="selectionImage" />}
            <div className="title-wrap">
              {Object.keys(selection.titleDisplays).map((locale, i) => {
                const title = selection.titleDisplays[locale];
                return (
                  <React.Fragment key={i}>
                    {i !== 0 && <hr className={`divider ${locale}`} />}
                    <h4 className={`selection-title ${locale}`}>{title}</h4>
                  </React.Fragment>
                );
              })}
            </div>
          </button>
        </div>
      )}
      {videoSelection === index && (
        <VideoPlayer
          video={selection}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      )}
    </div>
  ));

  return (
    <div>
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
