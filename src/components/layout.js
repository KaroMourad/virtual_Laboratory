import React from "react"
import {graphql, useStaticQuery} from "gatsby"

import Header from "./header"
import "./layout.css"
import {style} from "typestyle";

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
                <footer className={styles.footer}>
                    © {new Date().getFullYear()}
                </footer>
            </div>
        </div>
    )
};

export default Layout;

const styles = {
    layoutContainer: {
        display: "inline-flex",
        height: "100%",
        width: "100%",
        position: "relative",
    },
    layoutContent: {
        width: `calc(100% - ${HEADER_WIDTH}px)`,
        height: "100%",
        overflow: "auto"
    },
    main: {
        width: "100%",
        height: "100%",
        minHeight: 600,
        minWidth: 800,
        overflow: "hidden"
    },
    footer: style({
        position: "absolute",
        bottom: 0,
        left: HEADER_WIDTH / 2,
        transform: "translateX(-50%)",
        color: "white"
    })
};