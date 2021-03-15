import * as React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Author from "../components/Author"

import "./blog.css"

export const query = graphql`
  {
    allSanityImageAsset {
      edges {
        node {
          url
          _id
        }
      }
    }
    sanityPost(_id: {eq: "2fa91baf-c025-497e-b1c3-c9a810a9784e"}) {
      title
      readTime
      publishedAt
      _rawBody
      _rawMainImage
      author {
        name
        image {
          asset {
            url
          }
        }
        linkedin
        facebook
        twitter
      }
      mainImage {
        asset {
          url
        }
      }
    }
  }
`
const getParsedBlock = (parentBlock, allImages) => {
  if (!parentBlock.children) {
    if (parentBlock._type === "image") {
      const imageId = parentBlock.asset._ref
      const image = allImages.find(({ node: { _id } }) => _id === imageId)
      return `<img src="${image.node.url}"/>`
    } else if (parentBlock._type === "youtube") {
      const id = parentBlock.url.split("https://youtu.be/")[1];
      return `<iframe src="https://www.youtube.com/embed/${id}"
      width="100%"
      height="100%"
      frameborder='0'
      allow='autoplay; encrypted-media'
      title='video'
      allowfullscreen/>`
    }
    return;
  }

  return parentBlock.children.reduce((parsedBlock, block) => {
    if (block._type === "span" && block.marks.length === 0) {
      const containerElement = (parentBlock.style === "normal" ? "span" : parentBlock.style)

      return `${parsedBlock} <${containerElement}>${block.text}</${containerElement}>`
    } else if (block._type === "span" && block.marks.length > 0) {
      const definition = parentBlock.markDefs.find(({ _key }) => block.marks.includes(_key))
      const containerElement = (parentBlock.style === "normal" ? "span" : parentBlock.style)

      let blockText = block.text;

      if (block.marks.includes("em")) {
        blockText = `<${containerElement} style="font-style: italic">${blockText}</${containerElement}>`
      }

      if (definition) {
        if (definition._type === "link") {
          return `${parsedBlock} <a href="${definition.href}">${blockText}</a>`
        }
      } else {
        return `${parsedBlock} <${containerElement}>${blockText}</${containerElement}>`
      }
    }
  }, "")
}

const IndexPage = ({ data }) => {
  console.log("DATA: ", data);
  const post = data.sanityPost
  const allImages = data.allSanityImageAsset
  const header = post.title
  const { facebook, linkedin, twitter, name, image: { asset: { url } }} = data.sanityPost.author

  return (
    <div class="blogPost">
      <SEO title="Home"/>
      <h1>{header}</h1>
      <Author
        image={url}
        name={name}
        twitterURL={twitter}
        facebookURL={facebook}
        linkedinURL={linkedin}
        readTime={post.readTime}
        publishedAt={post.publishedAt}/>
      <img class="mainImage" src={post.mainImage.asset.url}/>
      {
        post._rawBody.map(blockData => (
          <div class={`block ${blockData._type === "youtube" ? "youtube" : ""}`}
            dangerouslySetInnerHTML={{ __html: getParsedBlock(blockData, allImages?.edges)}}/>
        ))
      }
    </div>
  )
}

export default IndexPage
