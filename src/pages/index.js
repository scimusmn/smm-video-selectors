import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

function IndexPage() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulVideoSelector {
          nodes {
            slug
            titleDisplay
          }
      }
    }
  `);

  const { allContentfulVideoSelector } = data;

  return (
    <>
      <h1>Video selectors</h1>
      <ul>
        {allContentfulVideoSelector.nodes.map((node) => (
          <li key={node.slug}>
            <strong>{node.slug}</strong>
            {' - '}
            <Link to={node.slug}>
              {node.titleDisplay}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default IndexPage;
