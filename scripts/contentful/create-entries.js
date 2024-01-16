require('dotenv').config({
  path: '.env.development',
});

const contentful = require('contentful');
const contentfulMan = require('contentful-management');

const envName = process.env.CONTENTFUL_ENVIRONMENT;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

// Use the content delivery api to get asset ids
const clientDelivery = contentful.createClient({
  space: spaceId,
  environment: envName,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Use the content management api to create entries
const clientManagement = contentfulMan.createClient({
  space: spaceId,
  environment: envName,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const ids = {
  videoId: '', captionId: '', backgroundId: '', thumbId: '',
};

clientDelivery.getAssets()
  .then((response) => {
    for (let i = 0; i < response.items.length; i += 1) {
      if (response.items[i].fields.title === 'video example') {
        ids.videoId = response.items[i].sys.id;
      } else if (response.items[i].fields.title === 'caption example') {
        ids.captionId = response.items[i].sys.id;
      } else if (response.items[i].fields.title === 'background example') {
        ids.backgroundId = response.items[i].sys.id;
      } else if (response.items[i].fields.title === 'selection image example') {
        ids.thumbId = response.items[i].sys.id;
      }
    }
    console.log(ids);
  })
  .then(
    // Create example Video with caption entry
    clientManagement.getSpace(spaceId)
      .then((space) => space.getEnvironment(envName))
      .then((env) => {
        env.createEntryWithId('videoWithCaption', 'videowithCaptionExample', {
          fields: {
            videoName: {
              'en-US': 'Example',
            },
            titleDisplay: {
              'en-US': 'Example',
            },
            videoAsset: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: ids.videoId,
                },
              },
            },
            captionAsset: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: ids.captionId,
                },
              },
            },
            thumbnail: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: ids.thumbId,
                },
              },
            },
          },
        }).then((entry) => entry.publish());

        // Create example Video Selector entry
        env.createEntryWithId('videoSelector', 'videoSelectorExample', {
          fields: {
            slug: {
              'en-US': 'example',
            },
            componentName: {
              'en-US': 'Example',
            },
            titleDisplay: {
              'en-US': 'Example',
            },
            backgroundAsset: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: ids.backgroundId,
                },
              },
            },
            selections: {
              'en-US': [{
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: 'videowithCaptionExample',
                },
              }],
            },
            inactivityDelay: {
              'en-US': 60,
            },
          },
        }).then((entry) => entry.publish());
      }),
  )
  .catch(console.error);
