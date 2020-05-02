import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { graphql } from 'gatsby'
import PrevNext from '../components/prevnext';
import MetaTags from '../components/Metatags';
import Share from '../components/share';
import ContactForm from '../components/contactform'

function BlogPost(props) {

    const url = props.data.site.siteMetadata.siteUrl
    const thumbnail = props.data.markdownRemark.frontmatter.image &&
        props.data.markdownRemark.frontmatter.image.childImageSharp.resize.src
    const { title, image, tags, date, engUrl, gerUrl, showContact} = props.data.markdownRemark.frontmatter;
    const { prev, next } = props.pageContext;
    return (
        <Layout>
            <MetaTags
                title={title}
                description={props.data.markdownRemark.excerpt}
                thumbnail={thumbnail && url + thumbnail}
                url={url}
                pathname={props.location.pathname}
            />
            <div>
              {
                engUrl ? (
                  <div>
                    <a href={engUrl}>Translate To English</a>
                    <br></br>
                  </div>
                ) : null
              }
              {
                gerUrl ? (
                  <div>
                    <a href={gerUrl}>Translate To German</a>
                    <br></br>
                  </div>
                ) : null
              }

              <br></br>
              <h1>{title}</h1>
              <span>{date}</span>
              {image && <Img fluid={image.childImageSharp.fluid} />}
              <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
              {
                showContact !== 'no' ? (
                  <ContactForm />
                ) : null
              }
              <div>
                  <span>Tagged in </span>
                  {tags.map((tag, i) => (
                      <a href={`/tags/${tag}`} key={i} style={{ marginLeft: "10px" }} >{tag}</a>
                  ))}
              </div>
              <Share title={title} url={url} pathname={props.location.pathname} />
              <PrevNext prev={prev && prev.node} next={next && next.node} />
            </div>
        </Layout>
    )
}


export default BlogPost

export const query = graphql`
 query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
       html
       excerpt
       frontmatter {
        date(formatString: "Do MMMM YYYY")
        title
        show
        tags
        engUrl
        gerUrl
        image {
          childImageSharp {
            resize(width: 1000, height: 420) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
   }
   site {
    siteMetadata {
        siteUrl
      }
   }
}
`
