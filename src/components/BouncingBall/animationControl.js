import React from 'react';
import {style} from "typestyle";

export const AnimationControl = ({handleStart, startClicked, handleChangeRange, deltaM, onChangeDeltaM, circleDelta, carDelta, initialCarVel, initialCircleVel}) =>
{
    return (
        <div className={styles.animControlCont}>
            <div className={styles.control}>
                <button style={styles.button} onClick={handleStart}>
                    {startClicked ? "Init" : "Start"}
                </button>
                <div className={styles.rangeContainer}>
                    <div>
                        <label htmlFor="ball">начальная ск. мяча (v)</label>:
                        <input
                            id="ball"
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            disabled={startClicked}
                            style={{margin: "0 10px", opacity: startClicked ? 0.5 : 1}}
                            onChange={handleChangeRange}
                            value={initialCircleVel}
                        />
                        <span>{initialCircleVel}</span>
                    </div>
                    <div>
                        <label htmlFor="car">начальная ск. авт/мяча (V)</label>:
                        <input
                            id="car"
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            disabled={startClicked}
                            style={{margin: "0 10px", opacity: startClicked ? 0.5 : 1}}
                            onChange={handleChangeRange}
                            value={initialCarVel}
                        />
                        <span>{initialCarVel}</span>
                    </div>
                </div>
            </div>
            <div className={styles.aboutDelta}>
                <div>
                    <span>m = 5,</span>
                    <label htmlFor="deltaM" style={{marginLeft: 15}}>M = m * </label>
                    <select
                        id="deltaM"
                        value={deltaM}
                        onChange={onChangeDeltaM}
                        disabled={startClicked}
                        style={{marginLeft: 5}}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>5</option>
                        <option>1000</option>
                    </select>
                </div>
                <div>
                    <span style={{fontWeight: "bold"}}>v՛ &asymp; {getValues().v1},</span>
                    <span style={{fontWeight: "bold"}}>V՛ &asymp; {getValues().V1},</span>
                    <span>V<sub>ц</sub> &asymp; {getValues().Vc}</span>
                </div>
            </div>
        </div>
    );

    function getValues()
    {
        const m = 5;
        const M = m * deltaM;
        const v = initialCircleVel; //16
        const V = initialCarVel; //7
        const Vc = (m * v + M * V) / (m + M); // 8.5

        const v1 = -v + 2 * Vc;
        const V1 = -V + 2 * Vc;
        return {
            v1: v <= V ? Infinity : Math.round(v1),
            V1: v <= V ? Infinity : Math.round(V1),
            Vc: Math.round(Vc)
        };
    }
};

const styles = {
    animControlCont: style({
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    }),
    control: style({
        display: "inline-block",
        verticalAlign: "top",
        padding: "10px 10px 10px 0",
        marginLeft: 11,
        boxShadow: "rgb(136, 136, 136) 1px 1px 3px 0px",
        borderRadius: 2,
        background: "white",
    }),
    aboutDelta: style({
        boxShadow: "rgb(136, 136, 136) -1px 1px 3px 0px",
        borderRadius: 2,
        padding: "10px 10px 10px 10px",
        marginRight: 11,
        background: "white",
        display: "inline-block",
        "$nest": {
            "& > div": {
                display: "flex"
            },
            "& > div:last-child": {
                paddingTop: 10
            },
            "& > div > span": {
                marginLeft: 15,
            },
            "& > div > span:first-child": {
                marginLeft: 0
            },
        }
    }),
    button: {
        marginLeft: 10,
        width: 80,
    },
    rangeContainer: style({
        marginLeft: 10,
        display: "inline-flex",
        flexDirection: "column",
        verticalAlign: "top",
        $nest: {
            "& > div": {
                display: "flex",
                alignItems: "center"
            },
            "& > div:last-child": {
                paddingTop: 10
            },
            "& > div > label": {
                minWidth: 230,
                textAlign: "right"
            },
            "& > div > span": {
                minWidth: 30,
                textAlign: "center"
            }
        }
    }),
};