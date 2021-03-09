import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  {
    allSanityPost {
      edges {
        node {
          title
          _rawBody
          _rawMainImage
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  console.log("DATA: ", data);
  const header = data.allSanityPost.edges[0].node.title;

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{header}</h1>
    </Layout>
  )
}

export default IndexPage
