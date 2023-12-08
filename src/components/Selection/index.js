/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

function Selection(props) {
  const { item, getSelection, currentSelection } = props;

  function click() {
    getSelection(item);
    // Replay video on click if current selection hasn't changed.
    // (Only applicable in a "youtube" type view, when selections and video player are both visible)
    if (item === currentSelection) {
      document.getElementById('video').play();
    }
    // Apply styles to hide list and show video
    const player = document.getElementById('player-wrapper');
    player.classList.remove('hide-wrapper');
    const items = document.getElementsByClassName('list-item');
    Object.keys(items).map((i) => items[i].classList.add('hide-selection'));
  }
  return (
    <div className="list-item">
      <div onClick={() => click()}>
        <img src={item.thumbnail.localFile.publicURL} alt="thumbnail" />
      </div>
      {Object.keys(item.titleDisplays).map((locale, i) => {
        const title = item.titleDisplays[locale];
        return (
          <React.Fragment key={i}>
            {i !== 0 && <hr className={`divider ${locale}`} />}
            <h4 className={`selection-title ${locale}`}>{title}</h4>
          </React.Fragment>
        );
      })}
    </div>
  );
}

Selection.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  getSelection: PropTypes.func.isRequired,
  currentSelection: PropTypes.func.isRequired,
};

export default Selection;
