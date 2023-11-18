import React from 'react';
import { graphql } from 'gatsby';
import VideoList from '@components/VideoList';

export const pageQuery = graphql`

  fragment VideoSelectorFragment on ContentfulVideoSelector {
    slug
    node_locale
    titleDisplay
    screenWidth
    screenHeight
    backgroundGraphic {
      localFile {
        publicURL
      }
    }
    selections {
      titleDisplay,
      caption {
        title
        localFile {
          publicURL
        } 
      }
      media {
        localFile {
          publicURL
        }
      }
      selectionImage {
        localFile {
          publicURL
        }
      }
    }
  }

  query ($slug: String!) {
      allContentfulLocale {
        edges {
          node {
            code
            default
          }
        }
      }
      allContentfulVideoSelector (
        filter: { slug: { eq: $slug } }
      ) {
        edges {
          node {
            ...VideoSelectorFragment
          }
        }
      }
  }
`;

function VideoSelector(all) {
  const { data } = all;

  const selectors = data.allContentfulVideoSelector.edges.map(({ node }) => node);

  // Get default locale code
  const defaultLocale = data.allContentfulLocale.edges.find(({ node }) => node.default).node.code;
  const defaultSelector = selectors.find((selector) => selector.node_locale === defaultLocale);

  // Create array of localized content based on a specific selection field
  function getLocales(field, selectionIndex) {
    const locales = {};
    selectors.forEach((selector) => {
      locales[selector.node_locale] = selector.selections[selectionIndex][field];
    });
    return locales;
  }

  // Loop over defaultSelector's selections to create selection objects
  // Mix in available locales as available
  const selections = defaultSelector.selections.map((selection, index) => {
    const selectionObject = {
      titleDisplay: selection.titleDisplay,
      titleDisplays: getLocales('titleDisplay', index),
      caption: selection.caption?.localFile.publicURL,
      captions: getLocales('caption', index),
      selectionImage: selection.selectionImage,
      selectionImages: getLocales('selectionImage', index),
      media: selection.media?.localFile.publicURL,
      medias: getLocales('media', index),
    };
    return selectionObject;
  });

  return (
    <div className={`video-selector ${defaultSelector.slug}`}>
      <div
        className="graphic background"
        style={{
          backgroundImage: `url(${defaultSelector.backgroundGraphic
            ? defaultSelector.backgroundGraphic.localFile.publicURL
            : null})`,
        }}
      />
      <div className="title-container">
        { selectors.map((selector) => (
          <h1 key={`title-${selector.node_locale}`} className={`title ${selector.node_locale}`}>
            {selector.titleDisplay}
          </h1>
        ))}
      </div>
      <VideoList
        selections={selections}
        screenHeight={defaultSelector.screenHeight.toString()}
        screenWidth={defaultSelector.screenWidth.toString()}
        graphic={
          defaultSelector.backgroundGraphic
            ? defaultSelector.backgroundGraphic.localFile.publicURL
            : null
          }
      />
    </div>
  );
}

export default VideoSelector;
