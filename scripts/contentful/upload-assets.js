/* eslint-disable no-shadow */

require('dotenv').config({
  path: '.env.development',
});

const fs = require('fs');
const contentful = require('contentful-management');

// Use the contentful management api token, not the content delivery api
const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const envName = process.env.CONTENTFUL_ENVIRONMENT;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

const bgFileToUpload = 'scripts/contentful/example-assets/example-bg.jpg';
const bgFileName = 'example-bg.jpg';
const captionFileToUpload = 'scripts/contentful/example-assets/example-caption.vtt';
const captionFileName = 'example-caption.vtt';
const videoFileToUpload = 'scripts/contentful/example-assets/example-video.mp4';
const videoFileName = 'example-clip.mp4';
const imgFileToUpload = 'scripts/contentful/example-assets/example-thumb.jpg';
const imgFileName = 'example-thumb.jpg';

client.getSpace(spaceId)
  .then((space) => space.getEnvironment(envName))
  .then((s) => {
    // CREATE VIDEO ASSET
    s.createAssetFromFiles({
      fields: {
        title: {
          'en-US': 'video example',
        },
        description: {
          'en-US': 'video example',
        },
        file: {
          'en-US': {
            contentType: 'video/mp4',
            fileName: videoFileName,
            file: fs.createReadStream(videoFileToUpload),
          },
        },
      },
    })
      .then((asset) => asset.processForAllLocales()
        .then((asset) => asset.publish()));

    // CREATE BACKGROUND ASSET
    s.createAssetFromFiles({
      fields: {
        title: {
          'en-US': 'background example',
        },
        description: {
          'en-US': 'background example mood picture',
        },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: bgFileName,
            file: fs.createReadStream(bgFileToUpload),
          },
        },
      },
    })
      .then((asset) => asset.processForAllLocales()
        .then((asset) => asset.publish()));

    // CREATE THUMBNAIL ASSET
    s.createAssetFromFiles({
      fields: {
        title: {
          'en-US': 'selection image example',
        },
        description: {
          'en-US': 'selection image example',
        },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: imgFileName,
            file: fs.createReadStream(imgFileToUpload),
          },
        },
      },
    })
      .then((asset) => asset.processForAllLocales()
        .then((asset) => asset.publish()));

    // CREATE CAPTION ASSET
    s.createAssetFromFiles({
      fields: {
        title: {
          'en-US': 'caption example',
        },
        description: {
          'en-US': 'caption example',
        },
        file: {
          'en-US': {
            contentType: 'text/vtt',
            fileName: captionFileName,
            file: fs.createReadStream(captionFileToUpload),
          },
        },
      },
    })
      .then((asset) => asset.processForAllLocales()
        .then((asset) => asset.publish()));
  })
  .catch(console.error);
