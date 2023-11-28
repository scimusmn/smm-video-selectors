import React from 'react';
import { graphql } from 'gatsby';
import VideoList from '@components/VideoList';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export const pageQuery = graphql`

  fragment VideoSelectorFragment on ContentfulVideoSelector {
    slug
    node_locale
    titleDisplay
    screenWidth
    screenHeight
    backgroundAsset {
      localFile {
        publicURL
      }
    }
    selections {
      titleDisplay,
      captionAsset {
        title
        localFile {
          publicURL
        } 
      }
      videoAsset {
        localFile {
          publicURL
        }
      }
      thumbnail {
        localFile {
          publicURL
        }
      }
    }
  }

  query ($slug: String!, $locales: [String]!) {
      allContentfulLocale {
        edges {
          node {
            code
            default
            name
          }
        }
      }
      allContentfulVideoSelector (
        filter: {
          slug: { eq: $slug }
          node_locale: { in: $locales }
        }
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
  const { data, pageContext } = all;

  // If only one locale is passed, create array with all other locales
  // This is used to create a language switcher
  let otherLocales = [];
  if (pageContext.locales.length === 1) {
    otherLocales = data.allContentfulLocale.edges.filter(
      ({ node }) => node.code !== pageContext.locales[0],
    );
  }

  const selectors = data.allContentfulVideoSelector.edges.map(({ node }) => node);

  // Get default locale code
  const defaultLocale = data.allContentfulLocale.edges.find(({ node }) => node.default).node.code;
  let defaultSelector = selectors.find((selector) => selector.node_locale === defaultLocale);
  if (!defaultSelector) {
    [defaultSelector] = selectors; // Default to first selector if default locale is not available
  }

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
      captionAsset: selection.captionAsset?.localFile.publicURL,
      captionAssets: getLocales('captionAsset', index),
      thumbnail: selection.thumbnail,
      thumbnails: getLocales('thumbnail', index),
      videoAsset: selection.videoAsset?.localFile.publicURL,
      videoAssets: getLocales('videoAsset', index),
    };
    return selectionObject;
  });

  return (
    <div className={`video-selector ${defaultSelector.slug}`}>
      <div
        className="graphic background"
        style={{
          backgroundImage: `url(${defaultSelector.backgroundAsset
            ? defaultSelector.backgroundAsset.localFile.publicURL
            : null})`,
        }}
      />
      <div className="title-container">
        {selectors.map((selector) => (
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
          defaultSelector.backgroundAsset
            ? defaultSelector.backgroundAsset.localFile.publicURL
            : null
        }
      />
      {otherLocales.length > 0 && (
        <LanguageSwitcher otherLocales={otherLocales} slug={defaultSelector.slug} />
      )}
    </div>
  );
}

export default VideoSelector;
