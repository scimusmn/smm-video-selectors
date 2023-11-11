exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  // eslint-disable-next-line global-require, import/no-unresolved
  const jsonData = require('../../static/content.json');

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

  // Get default locale code
  const defaultLocale = jsonData.locales.find((locale) => locale.default).code;
  console.log('defaultLocale--->', defaultLocale);

  // TODO: Replicate the below process for each locale, not just en-US
  // When available, take content using the locale key, otherwise use the default
  // Use the locale code to create a node ID

  function getLocalized(fieldValue, localeCode) {
    // Return the value as-is if it's not a locale object
    if (typeof fieldValue !== 'object') {
      return fieldValue;
    }
    // If it's an object with locale keys, return the value for requested locale
    if (fieldValue[localeCode]) {
      return fieldValue[localeCode];
    }
    // If the requested locale doesn't exist, fall back to default locale value
    if (fieldValue[defaultLocale]) {
      return fieldValue[defaultLocale];
    }
    console.warn(`Unable to localize field value ${localeCode} - ${fieldValue}`);
    return null;
  }

  // Transform Video Selectors from JSON into Contentful structure
  jsonData.videoSelectors.forEach((selector) => {
    // Create one node per locale (to match Contentful's locale structure)
    // These locale nodes are merged in front-end queries
    jsonData.locales.forEach((locale) => {
      const transformedData = {
        slug: selector.slug,
        node_locale: locale.code,
        titleDisplay: getLocalized(selector.title, locale.code),
        screenWidth: selector.screenWidth,
        screenHeight: selector.screenHeight,
        backgroundGraphic: {
          localFile: {
            publicURL: selector.backgroundAsset,
          },
        },
        selections: selector.selections.map((selection) => ({
          titleDisplay: getLocalized(selection.title, locale.code),
          caption: {
            title: 'caption-title-here', // What is this for?
            localFile: {
              publicURL: getLocalized(selection.caption, locale.code),
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
        id: createNodeId(`${transformedData.slug}-${locale.code}`),
        internal: {
          type: 'ContentfulVideoSelector',
          contentDigest: createContentDigest(transformedData),
        },
      };

      actions.createNode(node);
    });
  });
};
