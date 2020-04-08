import React, {useEffect, useState} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {style} from "typestyle";
import Graphic from "../components/page3/graphic";
import Info from "../components/page3/info";
import Animation from "../components/page3/animation";

let initialDelta1 = 300;
let initialDelta2 = 0;
const dDelta = initialDelta1 / 100;

let delta1 = initialDelta1;
let delta2 = initialDelta2;
let t = 0;
const ThirdPage = (props) =>
{
    const [startClicked, setStartClick] = useState(false);
    const [marginLeft1, setMarginLeft1] = useState(0);
    const [marginLeft2, setMarginLeft2] = useState(0);

    const requestRef1 = React.useRef(0);
    const requestRef2 = React.useRef(0);

    useEffect(() =>
    {
        if (startClicked)
        {
            requestRef1.current = requestAnimationFrame(start1);
            requestRef2.current = requestAnimationFrame(start2)
        } else
        {
            init();
        }
    }, [startClicked]);

    useEffect(() =>
    {
        if (marginLeft1 === 0 && marginLeft2 === 0)
        {
            cancelAnimation();
        }
    }, [marginLeft1, marginLeft2]);

    return (
        <Layout>
            <SEO title="Page three"/>
            <div className={styles.container}>
                <div className={styles.graphicContainer}>
                    <Graphic/>
                    <Info/>
                </div>
                <Animation
                    marginLeft1={marginLeft1}
                    marginLeft2={marginLeft2}
                    handleStart={handleStart}
                    startClicked={startClicked}
                    vel1={delta1}
                    vel2={delta2}
                    onchange1={onchange1}
                    onchange2={onchange2}
                />
            </div>
        </Layout>
    );

    function onchange1(e)
    {
        // delta1 = +e.target.value * 5;
    }

    function onchange2(e)
    {
        // delta2 = +e.target.value * 5;
    }

    function handleStart()
    {
        setStartClick(prevStartClicked => !prevStartClicked);
    }

    function start1()
    {
        setMarginLeft1(prevMarginLeft1 =>
        {
            let delta = delta1;
            if (prevMarginLeft1 + delta / 100 < 100)
            {
                delta1 = delta - dDelta;
                console.log("delta1", delta1, t++, "prevMarginLeft1", prevMarginLeft1);
                requestRef1.current = requestAnimationFrame(start1);
                return prevMarginLeft1 + delta / 100;
            } else
            {
                return prevMarginLeft1;
            }
        });
    }

    function start2()
    {
        setMarginLeft2(prevMarginLeft2 =>
        {
            let delta = delta2;
            if (prevMarginLeft2 + delta / 100 < 100)
            {
                delta2 = delta + dDelta;
                //console.log("delta2", delta2, t++);
                requestRef2.current = requestAnimationFrame(start2);
                return prevMarginLeft2 + delta / 100;
            } else
            {
                return prevMarginLeft2;
            }
        });
    }

    function init()
    {
        cancelAnimation();
        setMarginLeft1(0);
        setMarginLeft2(0);
        delta1 = initialDelta1;
        delta2 = initialDelta2;
    }

    function cancelAnimation()
    {
        cancelAnimationFrame(requestRef1.current);
        cancelAnimationFrame(requestRef2.current);
    }
};

export default ThirdPage;

const styles = {
    container: style({
        padding: 10,
        width: "100%",
        height: "100%",
    }),
    graphicContainer: style({
        width: "100%",
        height: "60%",
        display: "flex"
    })
};