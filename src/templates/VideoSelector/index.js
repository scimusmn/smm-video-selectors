import React from 'react';
import { graphql } from 'gatsby';
// import PropTypes from 'prop-types';
import VideoList from '@components/VideoList';

export const pageQuery = graphql`
  query ($slug: String!) {
    enContent:contentfulVideoSelector(
      node_locale: {eq:"en-US"},
      slug: { eq: $slug }) {
        displayTitle
        screenWidth
        screenHeight
        backgroundGraphic {
          localFile {
            publicURL
          }
        }
        selections {
          titleDisplay,
          media {
            localFile {
              publicURL
            }
          }
          caption {
            title
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
    esContent:contentfulVideoSelector(
      node_locale: {eq:"ar"},
      slug: { eq: $slug }) {
        displayTitle
        selections {
          titleDisplay
          caption {
            title
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
  }
`;

function VideoSelector(all) {
  const { data } = all;
  const lang1Content = data.enContent.selections.map((selection) => ({
    mediaRef: selection.media.localFile.publicURL,
    lang1Name: selection.titleDisplay,
    lang1Track: selection.caption ? selection.caption.localFile.publicURL : null,
    selectionImageLang1: selection.selectionImage
      ? selection.selectionImage.localFile.publicURL : null,
  }));

  const lang2Content = data.esContent.selections.map((selection) => ({
    lang2Name: selection.titleDisplay,
    lang2Track: selection.caption.localFile.publicURL,
  }));

  const content = [];
  for (let i = 0; i < lang1Content.length; i += 1) {
    content.push({
      ...lang1Content[i],
      ...lang2Content[i],
    });
  }

  const screenHeight = data.enContent.screenHeight.toString();
  const screenWidth = data.enContent.screenWidth.toString();

  return (
    <VideoList
      // eslint-disable-next-line react/destructuring-assignment
      slug={all.pageContext.slug}
      content={content}
      screenHeight={screenHeight}
      screenWidth={screenWidth}
      titleLang1={data.enContent.displayTitle}
      titleLang2={data.esContent.displayTitle}
      graphic={data.enContent.backgroundGraphic
        ? data.enContent.backgroundGraphic.localFile.publicURL : null}
    />
  );
}

export default VideoSelector;
