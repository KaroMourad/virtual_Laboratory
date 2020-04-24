import React from 'react';
import {style} from "typestyle";

export const AnimationControl = ({handleStart, startClicked, handleChangeRange, circleDelta, carDelta}) =>
{
    return (
        <div className={styles.animControlCont}>
            <div className={styles.control}>
                <button style={styles.button} onClick={handleStart}>
                    {startClicked ? "Init" : "Start"}
                </button>
                <div className={styles.rangeContainer}>
                    <div>
                        <label htmlFor="ball">ball velocity</label>:
                        <input
                            id="ball"
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            style={{margin: "0 10px"}}
                            onChange={handleChangeRange}
                            value={circleDelta}
                        />
                        <span>{circleDelta}</span>
                    </div>
                    <div>
                        <label htmlFor="car">car velocity</label>:
                        <input
                            id="car"
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            style={{margin: "0 10px"}}
                            onChange={handleChangeRange}
                            value={carDelta}
                        />
                        <span>{carDelta}</span>
                    </div>
                </div>
            </div>
            <div className={styles.aboutDelta}>
                <div>
                    <span>before hit</span>:
                    <span>Vb = V0 {circleDelta > 0 ? ` = ${circleDelta}` : ""}</span>
                </div>
                <div>
                    <span>after hit</span>:
                    <span>Vb = - (V0 - 2*Vc) {circleDelta > 0 ? "" : ` = ${circleDelta}`}</span>
                </div>
            </div>
        </div>
    );
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
        padding: "10px 0 10px 10px",
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
            "& > div > span:first-child": {
                textAlign: "right",
                width: 100
            },
            "& > div > span:last-child": {
                textAlign: "left",
                marginLeft: 10,
                width: 220
            }
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
                minWidth: 120,
                textAlign: "right"
            },
            "& > div > span": {
                minWidth: 30,
                textAlign: "center"
            }
        }
    }),
};