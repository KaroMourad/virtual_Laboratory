import React from "react";
import {style} from "typestyle";

const Control = ({height, handleStart, startClicked, handleChangeRange, circleDelta, carDelta}) =>
{
    return (
        <div style={{height: `calc(100% - ${height + 10})px`, padding: 10}}>
            <button style={styles.button} onClick={handleStart}>
                {startClicked ? "Init" : "Start"}
            </button>
            <div style={{display: "inline-flex", flexDirection: "column"}}>
                <div className={styles.rangeContainer}>
                    <div>
                        <label htmlFor="ball">ball velocity</label>:
                        <input
                            id="ball"
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            style={{margin: "0 10px"}}
                            onChange={handleChangeRange}
                            value={circleDelta}
                        />
                        {circleDelta}
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
                        {carDelta}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Control;

const styles = {
    button: {
        marginLeft: 20,
        width: 80,
        height: 30
    },
    rangeContainer: style({
        marginLeft: 20,
        $nest: {
            "& > div": {
                display: "flex",
                alignItems: "center"
            },
            "& > div:last-child": {
                paddingTop: 10
            },
            "& > div > label": {
                width: 100,
                textAlign: "left"
            }
        }
    }),
};