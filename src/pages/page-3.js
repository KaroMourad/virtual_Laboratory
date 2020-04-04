import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {style} from "typestyle";

const ThirdPage = () => (
    <Layout>
        <SEO title="Page three"/>
        <div className={styles.container}>
            <div className={styles.graphicContainer}>
                <div className={styles.graphic}>
                    graphic
                </div>
                <div className={styles.info}>
                    info
                </div>
            </div>
            <div className={styles.animContainer}>
                <div className={styles.ball1}/>
                <div className={styles.ball2}/>
                <div className={styles.line1}/>
                <div className={styles.line2}/>
            </div>
        </div>
    </Layout>
);

export default ThirdPage

const styles = {
    container: style({
        width: "100%",
        height: "100%",
    }),
    graphicContainer: style({
        width: "100%",
        height: "60%",
        display: "flex"
    }),
    graphic: style({
        flex: 1
    }),
    info: style({
        flex: 1
    }),
    animContainer: style({
        width: "100%",
        height: "40%",
        position: "relative"
    }),
    ball1: style({
        display: "inline-block",
        width: 40,
        height: 40,
        background: "red",
        borderRadius: "50%",
        position: "absolute",
        top: 0,
        left: "20%",
    }),
    ball2: style({
        display: "inline-block",
        width: 40,
        height: 40,
        background: "green",
        borderRadius: "50%",
        position: "absolute",
        top: "25%",
        left: "20%",
    }),
    line1: style({
        display: "inline-block",
        width: "60%",
        height: 1,
        background: "black",
        position: "absolute",
        top: 40,
        left: "20%",
    }),
    line2: style({
        display: "inline-block",
        width: "60%",
        height: 1,
        background: "black",
        position: "absolute",
        top: "calc(25% + 40px)",
        left: "20%",
    }),
};