import React from "react"
import {graphql, useStaticQuery} from "gatsby"

import Header from "./Header/header"
import "./layout.css"

export const HEADER_WIDTH = 230;

const Layout = ({children}) =>
{
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

    return (
        <div style={styles.layoutContainer}>
            <Header siteTitle={data.site.siteMetadata.title}/>
            <div style={styles.layoutContent}>
                <main style={styles.main}> {children} </main>
            </div>
        </div>
    )
};

export default Layout;

const styles = {
    layoutContainer: {
        display: "inline-flex",
        height: "100%",
        maxHeight: "100%",
        width: "100%",
        position: "relative",
    },
    layoutContent: {
        width: `100%`,
        height: "100%",
        maxHeight: "100%",
        overflow: "auto"
    },
    main: {
        width: "100%",
        maxHeight: "100%",
        height: "100%",
        minHeight: 600,
        minWidth: 800,
        overflow: "hidden"
    }
};