import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

export const HEADER_WIDTH = 250;

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
    <div style={styles.layoutContainer}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div style={styles.layoutContent}>
        <main style={styles.main} > {children} </main>
        <footer style={styles.footer}>
          © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}

export default Layout;

const styles = {
	layoutContainer: {
		display: "inline-flex",
		height: "100vh",
		width: "100%",
		minHeight: 200
	},
	layoutContent: {
		width: `calc(100% - ${HEADER_WIDTH}px)`,
		height: "100%"
	},
	main: {
		width: "100%",
		height: "100%"
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: HEADER_WIDTH/2,
		transform: "translateX(-50%)",
		color: "white"
	}
}