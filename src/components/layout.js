import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) =>
{
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div style={{display: "inline-flex",height: "100vh", width: "100%"}}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div style={{margin: `0 auto`,maxWidth: 960,padding: `0 1.0875rem 1.45rem`,}}>
        <main>
			{children}
		</main>
        <footer style={styles.footer}>
          © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}

export default Layout;

const styles = {
	footer: {
		position: "absolute",
		bottom: 0,
		left: 150,
		transform: "translateX(-50%)",
		color: "white"
	}
}