module.exports = function (migration) {
  /* Video with caption */

  const videoWithCaption = migration.createContentType('videoWithCaption', {
    displayField: 'title',
    name: 'Video with caption',
    description:
    'Pairs a video asset with one or more caption files',
  });

  videoWithCaption.createField('title', {
    name: 'Title',
    type: 'Symbol',
    localized: true,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  });

  videoWithCaption.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Internal use only - not displayed in the app',
  });

  videoWithCaption.createField('titleDisplay', {
    name: 'Title Display',
    type: 'Symbol',
    localized: true,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  });

  videoWithCaption.changeFieldControl('titleDisplay', 'builtin', 'singleLine', {
    helpText: 'Optional title for selection button',
  });

  videoWithCaption.createField('media', {
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
  });

  videoWithCaption.changeFieldControl('media', 'builtin', 'assetLinkEditor', {
    helpText: 'Video files must be .mp4 format',
  });

  videoWithCaption.createField('caption', {
    name: 'caption',
    type: 'Link',
    localized: false,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
    linkType: 'Asset',
  });

  videoWithCaption.changeFieldControl('caption', 'builtin', 'assetLinkEditor', {
    helpText: 'Must use files in .vtt format',
  });

  videoWithCaption.createField('selectionImage', {
    name: 'Selection image',
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
  });

  /* Video Selector */

  const videoSelector = migration.createContentType('videoSelector', {
    displayField: 'title',
    name: 'Video Selector',
    description: 'Creates a video selector kiosk app',
  });

  videoSelector.createField('slug', {
    name: 'Slug',
    type: 'Symbol',
    localized: false,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  });

  videoSelector.createField('title', {
    name: 'Title',
    type: 'Symbol',
    localized: true,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  });

  videoSelector.createField('titleDisplay', {
    name: 'Title Display',
    type: 'Symbol',
    localized: true,
    required: false,
    validations: [],
    disabled: false,
    omitted: false,
  });

  videoSelector.changeFieldControl('titleDisplay', 'builtin', 'singleLine', {
    helpText: 'Optional title for selection screen',
  });

  videoSelector.createField('backgroundGraphic', {
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
  });

  videoSelector.createField('screenWidth', {
    name: 'Screen width',
    type: 'Integer',
    localized: false,
    required: true,
    validations: [],
    disabled: false,
    omitted: false,
    defaultValue: {
      'en-US': 1920,
    },
  });

  videoSelector.changeFieldControl('screenWidth', 'builtin', 'numberEditor', {
    helpText: 'Width of the screen in pixels. Default landscape value is 1920.',
  });

  videoSelector.createField('screenHeight', {
    name: 'Screen height',
    type: 'Integer',
    localized: false,
    required: true,
    validations: [],
    disabled: false,
    omitted: false,
    defaultValue: {
      'en-US': 1080,
    },
  });

  videoSelector.changeFieldControl('screenHeight', 'builtin', 'numberEditor', {
    helpText: 'Width of the screen in pixels. Default landscape value is 1080.',
  });

  videoSelector.createField('selections', {
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
  });
};
