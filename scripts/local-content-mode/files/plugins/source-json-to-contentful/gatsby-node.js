exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  // eslint-disable-next-line global-require
  const jsonData = require('../../content/content.json');

  console.log('&&*&*&**&&*&**&*&*&*&*&*&*&*&*&*');
  console.log(jsonData);

  jsonData.videoSelections.forEach((video) => {
    // TODO: Transform JSON data to match the Contentful-like structure
    const transformedData = {
      slug: video.slug,
      title: video.title,
      description: video.description,
    };

    const node = {
      ...transformedData,
      // Required fields
      id: createNodeId(transformedData.slug),
      internal: {
        // type: 'ContentfulVideoSelection',
        type: 'ContentfulVideoSelector',
        contentDigest: createContentDigest(transformedData),
      },
    };

    actions.createNode(node);
  });
};
