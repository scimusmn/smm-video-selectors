exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  // eslint-disable-next-line global-require, import/no-unresolved
  const jsonData = require('../../static/content/content.json');

  // Transform Locales from JSON into Contentful structure
  jsonData.locales.forEach((locale) => {
    const transformedData = {
      code: locale.code,
      default: locale.default,
    };

    const node = {
      ...transformedData,
      // Required fields
      id: createNodeId(transformedData.code),
      internal: {
        type: 'ContentfulLocale',
        contentDigest: createContentDigest(transformedData),
      },
    };

    actions.createNode(node);
  });

  // Transform Video Selectors from JSON into Contentful structure
  jsonData.videoSelectors.forEach((selector) => {
    const transformedData = {
      slug: selector.slug,
      node_locale: 'en-US', // temporary
      titleDisplay: selector.title,
      screenWidth: selector.screenWidth,
      screenHeight: selector.screenHeight,
      backgroundGraphic: {
        localFile: {
          publicURL: selector.backgroundAsset,
        },
      },
      selections: selector.selections.map((selection) => ({
        titleDisplay: selection.title,
        caption: {
          title: selection.caption,
          localFile: {
            publicURL: selection.caption,
          },
        },
        media: {
          localFile: {
            publicURL: selection.media,
          },
        },
        selectionImage: {
          localFile: {
            publicURL: selection.selectionImage,
          },
        },
      })),
    };

    const node = {
      ...transformedData,
      // Required fields
      id: createNodeId(transformedData.slug),
      internal: {
        type: 'ContentfulVideoSelector',
        contentDigest: createContentDigest(transformedData),
      },
    };

    actions.createNode(node);
  });
};
