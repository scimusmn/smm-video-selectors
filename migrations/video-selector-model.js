require('dotenv').config({
  path: './.env.development',
});

// DOCS!
// https://contentful.github.io/contentful-management.js/contentful-management/9.0.0/interfaces/ContentType.html#update
/*
  TODO:
  Editor interface methods to add help text
*/

const contentful = require('contentful-management');

// Use the contentful management api token, not the content delivery api
const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const envName = process.env.CONTENTFUL_ENVIRONMENT;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

// Create video with caption content type
client.getSpace(spaceId)
  .then((space) => space.getEnvironment(envName))
  .then((environment) => environment.createContentTypeWithId('videoWithCaption', {
    name: 'Video with caption',
    description: 'Pairs a video asset with one or more caption files',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        localized: false,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'titleDisplay',
        name: 'Title Display',
        type: 'Symbol',
        localized: false,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'Media',
        name: 'Media',
        type: 'Link',
        localized: false,
        required: false,
        validations: [
          {
            linkMimetypeGroup: [
              'image',
              'video',
            ],
          },
        ],
        disabled: false,
        omitted: false,
        linkType: 'Asset',
      },
      {
        id: 'caption',
        name: 'caption',
        type: 'Link',
        localized: false,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
        linkType: 'Asset',
      },
      {
        id: 'selectionImage',
        name: 'Selection Image',
        type: 'Link',
        localized: false,
        required: false,
        validations: [
          {
            linkMimetypeGroup: [
              'image',
            ],
          },
        ],
        disabled: false,
        omitted: false,
        linkType: 'Asset',
      },
    ],
  }))
  .then((contentType) => contentType.publish())
  .then((contentType) => {
    console.log(`${contentType.sys.id} is published`);
    // IN PROGRESS - Create empty video with caption entry
    // client.getSpace(spaceId)
    //   .then((space) => space.getEnvironment(envName))
    //   .then((environment) => environment.createEntry('videoWithCaption', {
    //     fields: {
    //       title: { 'en-US': 'Example Video with Caption' },
    //       titleDisplay: { 'en-US': 'Awesome Example Video!' },
    //     },
    //   }))
    // .then((entry) => console.log(entry));
  })
  .catch(console.error);

// Create video selector content type
client.getSpace(spaceId)
  .then((space) => space.getEnvironment(envName))
  .then((environment) => environment.createContentTypeWithId('videoSelector', {
    name: 'Video Selector',
    description: 'Creates a video selector kiosk app',
    displayField: 'slug',
    fields: [
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        localized: false,
        required: true,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        localized: false,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'displayTitle',
        name: 'Display Title',
        type: 'Symbol',
        localized: true,
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'backgroundGraphic',
        name: 'Background graphic',
        type: 'Link',
        localized: false,
        required: false,
        validations: [
          {
            linkMimetypeGroup: [
              'image',
              'video',
            ],
          },
        ],
        disabled: false,
        omitted: false,
        linkType: 'Asset',
      },
      {
        id: 'screenWidth',
        name: 'Screen width',
        type: 'Integer',
        localized: false,
        required: true,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'screenHeight',
        name: 'Screen height',
        type: 'Integer',
        localized: false,
        required: true,
        validations: [],
        disabled: false,
        omitted: false,
      },
      {
        id: 'selections',
        name: 'Selections',
        type: 'Array',
        localized: false,
        required: true,
        validations: [],
        disabled: false,
        omitted: false,
        items: {
          type: 'Link',
          validations: [
            {
              linkContentType: [
                'videoWithCaption',
              ],
            },
          ],
          linkType: 'Entry',
        },
      },
    ],
  }))
  .then((contentType) => contentType.publish())
  .then((contentType) => {
    console.log(`${contentType.sys.id} is published`);
    // IN PROGRESS - create empty entry
    // client.getSpace(spaceId)
    //   .then((space) => space.getEnvironment(envName))
    //   .then((environment) => environment.createEntry('videoSelector', {
    //     fields: {
    //       slug: { 'en-US': 'example' },
    //       title: { 'en-US': 'My Awesome Example' },
    //       displayTitle: { 'en-US': 'My Awesome Example' },
    //       screenWidth: { 'en-US': 1920 },
    //       screenHeight: { 'en-US': 1080 },
    //       selections: { 'en-US': [] },
    //     },
    //   }))
    // .then((entry) => console.log(entry));
  })
  .catch(console.error);
