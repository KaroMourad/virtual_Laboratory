import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const UploadMyImage = (props) => 
{
  const data = useStaticQuery(graphql`
    query {
      car: file(relativePath: { eq: "car.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data[props.name].childImageSharp.fluid} />
}

export default UploadMyImage;
