import React from "react";
import {style} from "typestyle";

const Animation = ({marginLeft1, marginLeft2, handleStart, startClicked, initialValue, onchange1}) =>
{
    return (
        <div className={styles.animContainer}>
            <div style={{position: "absolute", top: 0, left: 0, marginTop: 20}}>
                <button style={{width: 80, marginLeft: 20,}} onClick={handleStart}>
                    {startClicked ? "Init" : "Start"}
                </button>
                <div className={styles.control}>
                    <label htmlFor="vel1">Choose the initial velocity of 1st ball:</label>
                    <select id="vel1"
                            style={styles.select}
                            value={initialValue}
                            onChange={onchange1}
                            disabled={startClicked}>
                        <option>0.75</option>
                        <option>1</option>
                        <option>1.25</option>
                        <option>1.5</option>
                        <option>1.75</option>
                        <option>2</option>
                    </select>
                </div>
            </div>
            <div style={styles.contAnimControl}>
                <div style={styles.cont1}>
                    <div className={styles.ball1}
                         style={{
                             marginLeft: `${100 - marginLeft1}%`,
                             transform: `rotateZ(${-3 * 360 / 100 * marginLeft1}deg)`
                         }}>
                        1
                    </div>
                </div>
            </div>
            <div style={Object.assign({}, styles.contAnimControl, {marginLeft: 40})}>
                <div style={styles.cont2}>
                    <div className={styles.ball2}
                         style={{
                             marginLeft: `calc(${marginLeft2}% - 40px)`,
                             transform: `rotateZ(${3 * 360 / 100 * marginLeft2}deg)`
                         }}>
                        2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Animation;

const styles = {
    animContainer: style({
        width: "100%",
        height: "40%",
        boxShadow: "inset 0px 0px 3px #888888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 4,
        background: "#f3f3f3",
    }),
    contAnimControl: {
        display: "inline-flex",
        width: "40%",
        alignItems: "center",
    },
    cont1: {
        position: "relative",
        width: "100%",
        borderBottom: "1px solid black",
        height: 40,
    },
    cont2: {
        position: "relative",
        width: "100%",
        borderBottom: "1px solid black",
        height: 40,
    },
    ball1: style({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        width: 40,
        height: 40,
        background: "red",
        borderRadius: "50%",
    }),
    ball2: style({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        width: 40,
        height: 40,
        background: "green",
        borderRadius: "50%",
    }),
    control: style({
        display: "inline-block",
        marginLeft: 20,
        "$nest": {
            "& > label": {
                fontSize: 16
            }
        }
    }),
    select: {
        marginLeft: 10,
        minWidth: 60
    },
};